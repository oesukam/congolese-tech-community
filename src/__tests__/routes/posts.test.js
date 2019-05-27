import request from 'supertest';
import app from '../../app';
import { postData } from '../../__mocks__/dummyData';
import { urlPrefix } from '../../__mocks__/variables';
import { Token } from '../../models';
import * as statusCodes from '../../constants/statusCodes';

let tokenData;
let token;
let postSlug;
describe('posts', () => {
  beforeAll(async () => {
    tokenData = await Token.findOne({}).sort({ createdAt: -1 });
    token = `Bearer ${tokenData.token}`;
  });

  describe('create a post', () => {
    test('should return `Unauthorized access`', async () => {
      const res = await request(app)
        .post(`${urlPrefix}/posts`)
        .send(postData);
      expect(res.status).toBe(statusCodes.UNAUTHORIZED);
      expect(res.body.message).toBe('Unauthorized access');
    });

    test('should return a `new post`', async () => {
      const res = await request(app)
        .post(`${urlPrefix}/posts`)
        .set('Authorization', token)
        .send(postData);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body.post).toHaveProperty('title');
    });
  });

  describe('update a post', () => {
    beforeAll(async () => {
      const res = await request(app)
        .post(`${urlPrefix}/posts`)
        .set('Authorization', token)
        .send(postData);
      postSlug = res.body.post.slug;
    });

    test('should return `Unauthorized access`', async () => {
      const res = await request(app)
        .put(`${urlPrefix}/posts/${postSlug}`)
        .send(postData);
      expect(res.status).toBe(statusCodes.UNAUTHORIZED);
      expect(res.body.message).toBe('Unauthorized access');
    });

    test('should return `Post does not exist`', async () => {
      const res = await request(app)
        .put(`${urlPrefix}/posts/fake-post-slug`)
        .send(postData);
      expect(res.status).toBe(statusCodes.NOT_FOUND);
      expect(res.body.message).toBe('Post does not exist');
    });

    test('should return a `updated post`', async () => {
      const res = await request(app)
        .put(`${urlPrefix}/posts/${postSlug}`)
        .set('Authorization', token)
        .send(postData);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body.post).toHaveProperty('title');
    });
  });

  describe('retreive a post', () => {
    beforeAll(async () => {
      const res = await request(app)
        .post(`${urlPrefix}/posts`)
        .set('Authorization', token)
        .send(postData);
      postSlug = res.body.post.slug;
    });

    test('should return `Post does not exist`', async () => {
      const res = await request(app).get(`${urlPrefix}/posts/fake-post-slug`);
      expect(res.status).toBe(statusCodes.NOT_FOUND);
      expect(res.body.message).toBe('Post does not exist');
    });

    test('should return `a post`', async () => {
      const res = await request(app).get(`${urlPrefix}/posts/${postSlug}`);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body.post).toHaveProperty('title');
    });
  });

  describe('retreive all posts', () => {
    test('should return `Post array`', async () => {
      const res = await request(app).get(`${urlPrefix}/posts`);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body.posts).toBeDefined();
    });
  });

  describe('delete a post', () => {
    test('should return `Unauthorized access`', async () => {
      const res = await request(app).delete(`${urlPrefix}/posts/${postSlug}`);
      expect(res.status).toBe(statusCodes.UNAUTHORIZED);
      expect(res.body.message).toBe('Unauthorized access');
    });
    test('should return `deleted post`', async () => {
      const res = await request(app)
        .delete(`${urlPrefix}/posts/${postSlug}`)
        .set('Authorization', token);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body.post).toHaveProperty('title');
    });
  });
});
