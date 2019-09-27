import mongoose from 'mongoose';
import AuthController from '../../controllers/AuthController';
import { User, Person } from '../../models';
import { personData as user } from '../../__mocks__/dummyData';

import app from '../../app';

const res = {
  redirect() { }
};

describe('Social login', () => {
  beforeAll(async () => {
    await User.deleteOne({ email: user.emails[0].value });
    jest.spyOn(res, 'redirect');
  });

  it('Should mock the social login controller', async () => {
    await AuthController.socialAuth({ user }, res);
    expect(res.redirect).toHaveBeenCalled();
  });

  it('Should mock the social login controller for an existing account', async () => {
    await AuthController.socialAuth({ user }, res);
    expect(res.redirect).toHaveBeenCalled();
  });

  it('Should mock the failing scenario when null values are provided', async () => {
    await AuthController.socialAuth(
      {
        user: {
          ...user,
          name: { givenName: null, familyName: null },
          emails: null,
        },
      },
      res,
    );
    expect(res.redirect).toHaveBeenCalled();
  });

  afterAll(async () => {
    await User.deleteOne({ email: user.emails[0].value });
    await Person.deleteMany({});
    await app.close();
    await mongoose.disconnect();
    jest.clearAllMocks();
  });
});
