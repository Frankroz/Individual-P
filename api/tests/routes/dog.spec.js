/* eslint-disable import/no-extraneous-dependencies */
const session = require("supertest-session");
const app = require("../../src/app.js");
const { conn } = require("../../src/db.js");

const agent = session(app);

describe("Routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("GET /dogs", () => {
    it("should get 200", () => agent.get("/dogs").expect(200));
  });
  describe("GET /dogs?name=...", () => {
    it("should get 404 and a message", () => {
      agent.get("/dogs?name=asdf").expect(404);
      agent.get("/dogs?name=asdf").expect({ msg: "No dogs were found :(" });
    });
    it("should get 200 and info", () => {
      agent.get("/dogs?name=Affenpinscher").expect(200);
      agent.get("/dogs?name=Affenpinscher").expect([
        {
          weight: {
            imperial: "6 - 13",
            metric: "3 - 6",
          },
          height: {
            imperial: "9 - 11.5",
            metric: "23 - 29",
          },
          id: 1,
          name: "Affenpinscher",
          bred_for: "Small rodent hunting, lapdog",
          breed_group: "Toy",
          life_span: "10 - 12 years",
          temperament:
            "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
          origin: "Germany, France",
          reference_image_id: "BJa4kxc4X",
          image: {
            id: "BJa4kxc4X",
            width: 1600,
            height: 1199,
            url: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
          },
        },
      ]);
    });
  });
  describe("GET /dogs/:id", () => {
    it("should check that id is within the limits", () => {
      agent.get("/dogs/1000").expect(400);
      agent.get("/dogs/1").expect(200);
    });
    it("should get info", () => {
      agent.get("/dogs/1").expect([
        {
          weight: {
            imperial: "6 - 13",
            metric: "3 - 6",
          },
          height: {
            imperial: "9 - 11.5",
            metric: "23 - 29",
          },
          id: 1,
          name: "Affenpinscher",
          bred_for: "Small rodent hunting, lapdog",
          breed_group: "Toy",
          life_span: "10 - 12 years",
          temperament:
            "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
          origin: "Germany, France",
          reference_image_id: "BJa4kxc4X",
          image: {
            id: "BJa4kxc4X",
            width: 1600,
            height: 1199,
            url: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
          },
        },
      ]);
    });
  });
  describe("POST /dogs", () => {
    it("shouldn't create dog if args are not sent", () => {
      agent.post("/dogs").send({}).expect(400);
    });
    it("should create dog if args are valid sent", () => {
      agent
        .post("/dogs")
        .send({
          name: "Barbado da Terceira",
          height: "50.8 - 55",
          weight: "25 - 27",
          life_span: "12 - 14",
          temperament: ["Loyal", "Intelligent", "Joyful"],
          breed_group: "Toy",
          bred_for: "Small rodent hunting, lapdog",
        })
        .expect(201);
    });
  });
  describe("GET /temperaments", () => {
    it("should respond with a 200", () => {
      agent.get("/temperaments").expect(200);
    });
    it("first arg should start with 'A'", () => {
      agent.get("/temperaments").expect(200);
      agent.get("/temperaments").then((r) => expect(r.text).to.have.legth(124));
    });
  });
});
