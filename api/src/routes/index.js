const { Router } = require("express");
const { Race, Temperament, race_temp, Users, favorites } = require("../db.js");
const axios = require("axios");
const bcrypt = require("bcrypt");

const router = Router();

async function* getId() {
  const data = await getData();
  let id = data[data.length - 1].id + 1;

  while (true) {
    yield await id;
    id++;
  }
}

async function getData() {
  const r = await axios.get("http://api.thedogapi.com/v1/breeds");
  let a = await Race.findAll({
    include: { model: Temperament },
  });

  a = JSON.parse(JSON.stringify(a, null, 2)).map((dog) => {
    dog.temperament = dog.temperaments.map((temper) => temper.name).join(", ");
    return dog;
  });

  const data = r.data.concat(a);
  return data;
}

// Configurar los routers
router.get("/dogs", async (req, res) => {
  const { name } = req.query;

  let data = await getData();

  if (name) {
    data = data.filter((dog) => dog.name.includes(name));
    if (!data.length)
      return res.status(404).send({ msg: "No dogs were found :(" });
    return res.send(data);
  }

  res.send(data);
});

router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;

  let data = await getData();

  if (id <= data.length && id > -1) {
    data = data.filter((dog) => {
      return dog.id == id;
    });
    if (!data.length)
      return res.status(404).send({ msg: "No dogs were found :(" });
    return res.send(data);
  }

  res.status(400).send({
    msg: "They Id is too large or too small, try a different one ;)",
  });
});

router.post("/dogs", async (req, res) => {
  const { name, height, weight, life_span, temperament } = req.body;

  let id = await getId();

  if (!name || !height || !weight || !life_span) {
    return res.sendStatus(400);
  }

  try {
    const i = (await id.next()).value;
    let body = { id: i };

    for (const att in req.body) {
      if (req.body[att]) body[att] = req.body[att];
    }

    await Race.create(body);

    await axios.get("http://localhost:3001/temperaments");

    for (const temper of temperament) {
      await race_temp.create({
        raceId: i,
        temperamentId: JSON.parse(
          JSON.stringify(
            await Temperament.findOne({
              where: {
                name: temper,
              },
            }),
            null,
            2
          )
        ).id,
      });
    }

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.put("/dogs", async (req, res) => {
  const { id, name, height, weight, life_span, temperament } = req.body;

  if (!name || !height || !weight || !life_span) {
    return res.sendStatus(400);
  }

  try {
    let body = {};
    for (const att in req.body) {
      if (req.body[att]) body[att] = req.body[att];
    }

    Race.update(body, { where: { id } });

    for (const temper of temperament) {
      await race_temp.upsert(
        {
          raceId: id,
          temperamentId: JSON.parse(
            JSON.stringify(
              await Temperament.findOne({
                where: {
                  name: temper,
                },
              }),
              null,
              2
            )
          ).id,
        },
        {
          where: {
            raceId: id,
          },
        }
      );
    }

    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.delete("/dogs/:id", (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      res.sendStatus(400);
    }

    Race.destroy({ where: { id } });

    race_temp.destroy({ where: { raceId: id } });

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.get("/temperaments", async (req, res) => {
  let tempers = [];
  const data = await getData();
  for (const dog of data) {
    if (dog.temperament) {
      for (const temper of dog.temperament.split(", ")) {
        if (!tempers.includes(temper)) tempers.push(temper);
      }
    }
  }

  tempers.sort();

  try {
    tempers.map((temper) => {
      Temperament.create({ name: temper }).catch((err) => err);
    });
  } catch (err) {
    res.sendStatus(400);
  }

  res.send(tempers);
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (username && email && password) {
      await Users.create({ username, email, password });
      return res.sendStatus(201);
    }
    res.sendStatus(400);
  } catch (error) {
    res.status(400).send(error.errors[0].message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.sendStatus(400);
  }

  try {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      res.sendStatus(204);
    }

    if (await bcrypt.compare(password, user.password)) {
      return res.send({ userId: user.id, username: user.username });
    }
    res.sendStatus(400);
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
