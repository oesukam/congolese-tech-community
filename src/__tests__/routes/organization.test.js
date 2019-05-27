import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { User, Organization } from '../../models';
import { organization } from '../../__mocks__/dummyData';
import { urlPrefix } from '../../__mocks__/variables';
import encrypt from '../../helpers/encrypt';
import app from '../../app';

describe('Organization auth', () => {
  describe('Signup with email', () => {
    test('should sign up the user', async () => {
      const resp = await request(app)
        .post(`${urlPrefix}/auth/signup`)
        .send(organization);
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
    const { email, username } = organization;
    const token = encrypt.generateToken({ email, username });
    test('should not log the user in when the account is not verified', async () => {
      const resp = await request(app)
        .post(`${urlPrefix}/auth/login`)
        .send({ username: 'company_name', password: 'CompanyName123' });
      expect(resp.status).toBe(403);
      expect(resp.body.message).toBe('Check your email for account verification',);
    });

    test('should verify the account', async () => {
      const resp = await request(app).get(`${urlPrefix}/auth/verification/${token}`,);
      expect(resp.status).toBe(200);
      expect(resp.body.message).toBe('Your account has been verified successfully',);
    });

    test('should verify the account', async () => {
      const resp = await request(app).get(`${urlPrefix}/auth/verification/${token}`,);
      expect(resp.status).toBe(400);
      expect(resp.body.message).toBe('Your account has already been verified');
    });

    test('should verify the account', async () => {
      const expiredToken = jwt.sign({ email, username }, process.env.SECRET, {
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

  afterAll(async () => {
    await User.deleteOne({ email: organization.email });
    await Organization.deleteMany({});
    await app.close();
    await mongoose.disconnect();
  });
});
