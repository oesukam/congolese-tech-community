import request from 'supertest';
import app from '../../app';
import { postData, organizationShare } from '../../__mocks__/dummyData';
import { urlPrefix } from '../../__mocks__/variables';
import { User, Token, Post, Job } from '../../models';
import * as statusCodes from '../../constants/statusCodes';
import slugString from '../../helpers/slugString';

let token;
let post;
let job;
describe('Shares', () => {
  beforeAll(async () => {
    const user1 = await User.findOne({ username: 'admin' });
    const tokenData = await Token.findOne({ user: user1._id }).sort({
      createdAt: -1,
    });

    token = `Bearer ${tokenData.token}`;
    post = await Post.create({ ...postData, slug: slugString('Test') });
    job = await Job.create({ ...postData, slug: slugString('Test') });
  });

  test('Should share the post ', async () => {
    const res = await request(app)
      .post(`${urlPrefix}/posts/${post.slug}/share/facebook`)
      .set('Authorization', token);
    expect(res.status).toBe(statusCodes.OK);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Post has been updated successfully');
  });

  test('Should share the job ', async () => {
    const res = await request(app)
      .post(`${urlPrefix}/posts/${job.slug}/share/facebook`)
      .set('Authorization', token);
    expect(res.status).toBe(statusCodes.OK);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Post has been updated successfully');
  });

  test('Should not share when the slug is not found in posts nor in jobs', async () => {
    const res = await request(app)
      .post(`${urlPrefix}/posts/${job.slug}ok/share/facebook`)
      .set('Authorization', token);
    expect(res.status).toBe(statusCodes.NOT_FOUND);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Post or Job does not exist');
  });

  afterAll(async () => {
    await User.deleteOne({ email: organizationShare.email });
    await app.close();
  });
});
