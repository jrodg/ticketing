
import request from "supertest";
import { app } from "../../app";

it("return 201 on successfull sigup", async () => {
    return request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "werwerwer"
    }).expect(201)
})
it('returns a 400 with an invalid email', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'alskdflaskjfd',
        password: 'password'
      })
      .expect(400);
  });
  
  it('returns a 400 with an invalid password', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'alskdflaskjfd',
        password: 'p'
      })
      .expect(400);
  });
  
  it('returns a 400 with missing email and password', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com'
      })
      .expect(400);
  
    await request(app)
      .post('/api/users/signup')
      .send({
        password: 'alskjdf'
      })
      .expect(400);
  });

  it('do not allow duplicate emails', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'alskdflaskjfd@test.com',
        password: 'ppppppp'
      })
      .expect(201);

      await request(app)
      .post('/api/users/signup')
      .send({
        email: 'alskdflaskjfd@test.com',
        password: 'ppppppp'
      })
      .expect(400);
  });

  it('sets a cookie after successful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'alskdflaskjfd@test.com',
        password: 'pqweqwe'
      })
      .expect(201);

      expect(response.get("Set-Cookie")).toBeDefined()
  });