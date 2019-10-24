import request from 'supertest';
import app from '../../app';
import { urlPrefix } from '../../__mocks__/variables';
import * as statusCodes from '../../constants/statusCodes';
import { User, Token, Post } from '../../models';
import { postData } from '../../__mocks__/dummyData';
import slugString from '../../helpers/slugString';

let tokenData;
let token;
let user;
describe('Feeds', () => {
  beforeAll(async () => {
    user = await User.findOne({ username: 'admin' });
    tokenData = await Token.findOne({ user: user._id }).sort({
      createdAt: -1,
    });
    token = `Bearer ${tokenData.token}`;
    await Post.create({ ...postData, slug: slugString('Test') });
  });

  describe('Home Feeds', () => {
    test('Should get Feeds', async () => {
      const res = await request(app).get(`${urlPrefix}/feed`);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body.feed).toEqual(expect.any(Array));
      expect(res.body.feed[0].description).toBe(postData.description);
    });

    test('Should get Feeds with `Authorization` header set', async () => {
      const res = await request(app)
        .get(`${urlPrefix}/feed`)
        .set('Authorization', token);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body.feed).toEqual(expect.any(Array));
      expect(res.body.feed[0].description).toBe(postData.description);
    });

    test('Should get organization feeds', async () => {
      const res = await request(app).get(`${urlPrefix}/feed/organization`);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body.feed).toEqual(expect.any(Array));
    });
  });
});
