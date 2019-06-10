import request from 'supertest';
import app from '../../app';
import { jobData, jobCategoryData } from '../../__mocks__/dummyData';
import { urlPrefix } from '../../__mocks__/variables';
import { User, Token, JobCategory, Job } from '../../models';
import * as statusCodes from '../../constants/statusCodes';
import slugString from '../../helpers/slugString';

let tokenData;
let token;
let jobSlug;
let jobCategory;
let job;
let user;
describe('jobs', () => {
  beforeAll(async () => {
    user = await User.findOne({ username: 'admin' });
    tokenData = await Token.findOne({ user: user._id }).sort({
      createdAt: -1,
    });
    token = `Bearer ${tokenData.token}`;
    await JobCategory.updateOne(
      { name: jobCategoryData.name },
      jobCategoryData,
      {
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );
    jobCategory = await JobCategory.findOne({ name: jobCategoryData.name });
    jobData.category = jobCategory._id;
    jobSlug = jobCategory.slug;
    job = await Job.create({ ...jobData, slug: slugString('job') });
  });

  describe('create a post', () => {
    test('should return `Unauthorized access`', async () => {
      const res = await request(app)
        .post(`${urlPrefix}/jobs`)
        .send(jobData);
      expect(res.status).toBe(statusCodes.UNAUTHORIZED);
      expect(res.body.message).toBe('Unauthorized access');
    });

    test('should return a `new post`', async () => {
      const res = await request(app)
        .post(`${urlPrefix}/jobs`)
        .set('Authorization', token)
        .send(jobData);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body.job).toHaveProperty('title');
    });
  });

  describe('update a post', () => {
    beforeAll(async () => {
      const res = await request(app)
        .post(`${urlPrefix}/jobs`)
        .set('Authorization', token)
        .send(jobData);
      jobSlug = res.body.job.slug;
    });

    test('should return `Unauthorized access`', async () => {
      const res = await request(app)
        .put(`${urlPrefix}/jobs/${jobSlug}`)
        .send(jobData);
      expect(res.status).toBe(statusCodes.UNAUTHORIZED);
      expect(res.body.message).toBe('Unauthorized access');
    });

    test('should return `Unauthorized access`', async () => {
      const res = await request(app)
        .put(`${urlPrefix}/jobs/${job.slug}`)
        .set('Authorization', token)
        .send(jobData);
      expect(res.status).toBe(statusCodes.UNAUTHORIZED);
      expect(res.body.message).toBe('Unauthorized access');
    });

    test('should return `Job does not exist`', async () => {
      const res = await request(app)
        .put(`${urlPrefix}/jobs/fake-post-slug`)
        .send(jobData);
      expect(res.status).toBe(statusCodes.NOT_FOUND);
      expect(res.body.message).toBe('Job does not exist');
    });

    test('should return a `updated post`', async () => {
      const res = await request(app)
        .put(`${urlPrefix}/jobs/${jobSlug}`)
        .set('Authorization', token)
        .send(jobData);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body.job).toHaveProperty('title');
    });
  });

  describe('retreive a post', () => {
    beforeAll(async () => {
      const res = await request(app)
        .post(`${urlPrefix}/jobs`)
        .set('Authorization', token)
        .send(jobData);
      jobSlug = res.body.job.slug;
    });

    test('should return `Job does not exist`', async () => {
      const res = await request(app).get(`${urlPrefix}/jobs/fake-post-slug`);
      expect(res.status).toBe(statusCodes.NOT_FOUND);
      expect(res.body.message).toBe('Job does not exist');
    });

    test('should return `a post`', async () => {
      const res = await request(app).get(`${urlPrefix}/jobs/${jobSlug}`);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body.job).toHaveProperty('title');
    });
  });

  describe('retreive all jobs', () => {
    test('should return `Post array`', async () => {
      const res = await request(app).get(`${urlPrefix}/jobs`);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body.jobs).toBeDefined();
    });
  });

  describe('delete a post', () => {
    test('should return `Unauthorized access`', async () => {
      const res = await request(app).delete(`${urlPrefix}/jobs/${jobSlug}`);
      expect(res.status).toBe(statusCodes.UNAUTHORIZED);
      expect(res.body.message).toBe('Unauthorized access');
    });

    test('should return `Unauthorized access`', async () => {
      const res = await request(app)
        .delete(`${urlPrefix}/jobs/${job.slug}`)
        .set('Authorization', token);
      expect(res.status).toBe(statusCodes.UNAUTHORIZED);
      expect(res.body.message).toBe('Unauthorized access');
    });
    test('should return `deleted post`', async () => {
      const res = await request(app)
        .delete(`${urlPrefix}/jobs/${jobSlug}`)
        .set('Authorization', token);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body.job).toHaveProperty('title');
    });
  });
});
