const { Race, Temperament, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Race model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Temperament.sync({ force: true }));

  it("should not create new dog if name is null", async () => {
    try {
      await Race.create({});
    } catch (err) {
      expect(err.message).to.not.be.null;
    }
  });

  it("should work when min args are sent", async () => {
    try {
      const dog = await Race.create({
        name: "Pug",
        height: "12 - 13",
        weight: "14 - 20",
      });
      expect(dog.toJSON()).to.have.property("name", "Pug");
      expect(dog.toJSON()).to.have.property("height", "12 - 13");
    } catch (err) {
      throw new Error(error.message);
    }
  });

  it("shouldn't work when repeated args are sent", async () => {
    try {
      const dog1 = await Race.create({
        name: "Pug",
        height: "12 - 13",
        weight: "14 - 20",
      });
      expect(dog1.toJSON()).to.have.property("name", "Pug");
      expect(dog1.toJSON()).to.have.property("height", "12 - 13");
      await Race.create({
        name: "Pug",
        height: "12 - 13",
        weight: "14 - 20",
      });
    } catch (err) {
      expect(err.message).to.not.be.null;
    }
  });
});

describe("Temperament model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Temperament.sync({ force: true }));

  it("should not create `temper` if name is not send", async () => {
    try {
      await Temperament.create({});
    } catch (err) {
      expect(err.message).to.not.be.null;
    }
  });
  it("should create new temper with `Loyal`", async () => {
    try {
      const temper1 = await Temperament.create({ name: "Loyal" });
      expect(temper1.toJSON()).to.have.property("id", 1);
      expect(temper1.toJSON()).to.have.property("name", "Loyal");
      const temper2 = await Temperament.create({ name: "Intelligent" });
      expect(temper2.toJSON()).to.have.property("id", 1);
      expect(temper2.toJSON()).to.have.property("name", "Loyal");
      await Temperament.create({ name: "Loyal" });
    } catch (err) {
      expect(err.message).to.not.be.null;
    }
  });

  it("should not create `Loyal` is repeated", async () => {
    try {
      await Temperament.create({ name: "Loyal" });
      await Temperament.create({ name: "Loyal" });
    } catch (err) {
      expect(err.message).to.not.be.null;
    }
  });
});
