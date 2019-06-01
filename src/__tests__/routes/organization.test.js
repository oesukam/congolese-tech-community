import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { User, Organization } from '../../models';
import { organization } from '../../__mocks__/dummyData';
import { urlPrefix } from '../../__mocks__/variables';
import app from '../../app';

describe('Organization auth', () => {
  let userId;
  let tokenLog;
  describe('Signup with email', () => {
    test('should sign up the user', async () => {
      const resp = await request(app)
        .post(`${urlPrefix}/auth/signup`)
        .send(organization);
      userId = resp.body.user._id;
      tokenLog = resp.body.token;
      expect(resp.status).toBe(201);
      expect(resp.body).toHaveProperty('token');
    });

    test('should not sign up the user with the username which already exist', async () => {
      const resp = await request(app)
        .post(`${urlPrefix}/auth/signup`)
        .send(organization);
      expect(resp.status).toBe(409);
      expect(resp.body.message).toBe('Username already exist');
    });

    test('should not sign up the user with the email which already exist', async () => {
      const badOrg = organization;
      badOrg.username = 'new_username';
      const resp = await request(app)
        .post(`${urlPrefix}/auth/signup`)
        .send(badOrg);
      expect(resp.status).toBe(409);
      expect(resp.body.message).toBe('Email already exist');
    });
  });

  describe('Email verification', () => {
    const { username, password } = organization;

    test('should not log the user in when the account is not verified', async () => {
      const resp = await request(app)
        .post(`${urlPrefix}/auth/login`)
        .send({ username, password });
      expect(resp.status).toBe(403);
      expect(resp.body.message).toBe('Check your email for account verification',);
    });

    test('should verify the account', async () => {
      const resp = await request(app).get(`${urlPrefix}/auth/verification/${tokenLog}`,);
      expect(resp.status).toBe(200);
      expect(resp.body.message).toBe('Your account has been verified successfully',);
    });

    test('should not verify the account when it is already verified', async () => {
      const resp = await request(app).get(`${urlPrefix}/auth/verification/${tokenLog}`,);
      expect(resp.status).toBe(400);
      expect(resp.body.message).toBe('Your account has already been verified');
    });

    test('should not verify the account when the token has expired', async () => {
      const expiredToken = jwt.sign({ id: userId }, process.env.SECRET, {
        expiresIn: '0.1s',
      });
      const resp = await request(app).get(`${urlPrefix}/auth/verification/${expiredToken}`,);
      expect(resp.status).toBe(401);
      expect(resp.body.message).toBe('Your verification email has expired, try to login to receive a new one',);
    });
  });

  describe('login with username or email verification', () => {
    test('should log the user in', async () => {
      const resp = await request(app)
        .post(`${urlPrefix}/auth/login`)
        .send({ username: 'company_name', password: 'CompanyName123' });
      expect(resp.status).toBe(200);
      expect(resp.body).toHaveProperty('token');
    });

    test('should not log the user in with wrong credentials', async () => {
      const resp = await request(app)
        .post(`${urlPrefix}/auth/login`)
        .send({ username: 'company', password: 'CompanyN1233' });
      expect(resp.status).toBe(401);
      expect(resp.body.message).toBe('The credentials you provided are incorrect',);
    });
  });

  describe('Reset password', () => {
    test('should send the reset password link', async () => {
      const resp = await request(app)
        .post(`${urlPrefix}/auth/password`)
        .send({ email: organization.email });
      expect(resp.status).toBe(200);
      expect(resp.body.data).toHaveProperty('token');
    });

    test('should send the reset password link', async () => {
      const resp = await request(app)
        .post(`${urlPrefix}/auth/password`)
        .send({ email: `k${organization.email}` });
      expect(resp.status).toBe(404);
      expect(resp.body).toHaveProperty('message');
      expect(resp.body.message).toBe('email does not exist');
    });

    test('should not update the password with the same password', async () => {
      const resp = await request(app)
        .put(`${urlPrefix}/auth/password`)
        .set('Authorization', `Bearer ${tokenLog}`)
        .send({ password: organization.password });
      expect(resp.status).toBe(400);
      expect(resp.body).toHaveProperty('message');
      expect(resp.body.message).toBe('New password must be different from the current',);
    });

    test('should reset the passord', async () => {
      const resp = await request(app)
        .put(`${urlPrefix}/auth/password`)
        .set('Authorization', `Bearer ${tokenLog}`)
        .send({ password: `${organization.password}12` });
      expect(resp.status).toBe(200);
      expect(resp.body).toHaveProperty('message');
      expect(resp.body.message).toBe('Password has been updated successfully');
    });
  });

  afterAll(async () => {
    await User.deleteOne({ email: organization.email });
    await Organization.deleteMany({});
    await app.close();
    await mongoose.disconnect();
  });
});
