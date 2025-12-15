import request from "supertest";
import app from "../server.js";
import User from "../models/User.js";

describe("User API", () => {
  let userToken, adminToken, userId;

  beforeEach(async () => {
    // 1. Create User
    const userRes = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "user@example.com",
      password: "password123",
    });
    userToken = userRes.body.accessToken;
    userId = userRes.body.user.id;

    // 2. Create Admin
    const adminRes = await request(app).post("/api/auth/register").send({
      name: "Admin User",
      email: "admin@example.com",
      password: "password123",
    });
    await User.updateOne({ email: "admin@example.com" }, { role: 1 });
    const adminLogin = await request(app).post("/api/auth/login").send({
      email: "admin@example.com",
      password: "password123",
    });
    adminToken = adminLogin.body.accessToken;
  });

  it("should get own profile", async () => {
    const res = await request(app)
      .get("/api/users/me")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("user@example.com");
  });

  it("should update own profile", async () => {
    const res = await request(app)
      .put("/api/users/me")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ name: "Updated Name" });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated Name");
  });

  it("should list all users (Admin)", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  it("should block a user (Admin)", async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/disabled|blocked/i);

    // Verify user is blocked
    const user = await User.findById(userId);
    expect(user.isActive).toBe(false);
  });
});
