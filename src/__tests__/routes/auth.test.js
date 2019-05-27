import mongoose from 'mongoose';
import AuthController from '../../controllers/AuthController';
import { User, Person } from '../../models';
import { personData as user } from '../../__mocks__/dummyData';
import * as statusCodes from '../../constants/statusCodes';

import app from '../../app';

const res = {
  status() {
    return this;
  },
  json() {},
};

describe('Social login', () => {
  beforeAll(() => {
    jest.spyOn(res, 'status');
  });

  it('Should mock the social login controller', async () => {
    await AuthController.socialAuth({ user }, res);
    expect(res.status).toHaveBeenCalledWith(statusCodes.CREATED);
  });

  it('Should mock the social login controller for an existing account', async () => {
    await AuthController.socialAuth({ user }, res);
    expect(res.status).toHaveBeenCalledWith(statusCodes.OK);
  });

  it('Should mock the failing scenario when null values are provided', async () => {
    await AuthController.socialAuth(
      {
        user: {
          ...user,
          id: '3456790876854',
          name: { givenName: null, familyName: null },
          emails: null,
        },
      },
      res,
    );
    expect(res.status).toHaveBeenCalledWith(statusCodes.OK);
  });

  afterAll(async () => {
    await User.deleteOne({ email: user.emails[0].value });
    await Person.deleteMany({});
    await app.close();
    await mongoose.disconnect();
    jest.clearAllMocks();
  });
});
