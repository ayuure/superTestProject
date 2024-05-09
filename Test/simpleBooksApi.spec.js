const { time } = require("console");
const jestConfig = require("../jest.config.js");
const request = require("supertest");
const expect = require("chai").expect;
const baseurl = jestConfig.baseUrl;
const app = baseurl;

describe("First test", () => {
  let accessToken; // Declare the accessToken variable
  let orderId;
  let users = {
    clientName: "Bertina Ayuure",
    clientEmail: "bertina" + new Date().getTime() + "@amalitech.com",
  };

  beforeAll(async () => {
    try {
      const response = await request(app)
        .post("/api-clients/")
        .send(users)
        .set("Accept", "application/json");

      expect(response.body.accessToken).to.exist;
      accessToken = response.body.accessToken; // Assign the accessToken value
    } catch (error) {
      throw error;
    }
  });

  it("Check the status of books", async () => {
    try {
      const response = await request(app).get("/status");
      expect(response.body).to.have.property("status");
    } catch (error) {
      throw error;
    }
  });

  // Use the accessToken in your test logic
  it("Get a book", async () => {
    try {
      const response = await request(app).get("/books");
      //console.log(response.body[1].id);
      expect(response.body[1].id).to.be.eq(2);
    } catch (error) {
      throw error;
    }
  });
  it("Get a single book", async () => {
    try {
      const response = await request(app).get("/books/6");
      expect(response.body.id).to.be.eq(6);
    } catch (error) {
      throw error;
    }
  });
  it("Submit an order", async () => {
    try {
      const response = await request(app)
        .post("/orders")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          bookId: 1,
          customerName: "John",
        });
      expect(response.body.created).to.eq(true);
      //console.log(response.body.created);
      orderId = response.body.orderId;
      console.log(orderId);
    } catch (error) {
      throw error;
    }
  });
  it("Get all orders", async () => {
    try {
      const response = await request(app)
        .get("/orders")
        .set("Authorization", accessToken);
      expect(response.body[0].id).to.eq(orderId);
      //console.log()
    } catch (error) {
      throw error;
    }
  });
  it("Update an order", async () => {
    try {
      const response = await request(app)
        .patch(`/orders/${orderId}`)
        .set("Authorization", accessToken)
        .send({
          customerName: "Bertina",
        });
      expect(204);
    } catch (error) {
      throw error;
    }
  });

  it("Get order after update", async () => {
    try {
      const response = await request(app)
        .get(`/orders/${orderId}`)
        .set("Authorization", accessToken);
      expect(response.body.customerName).to.eq("Bertina");
    } catch (error) {
      throw error;
    }
  });
  it("Delete an order", async () => {
    const response = request(app).delete(`/orders/${orderId}`);
    expect(204);
  });
});
