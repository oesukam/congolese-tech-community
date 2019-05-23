import mongoose from 'mongoose';
import Auth from '../controllers/auth';
import User from '../models/User';
import Personal from '../models/Personal';
import server from '../index';

import users from '../__mocks__/users';

const { personal: user } = users;

const res = {
    status() { return this },
    json() { },
};

jest.spyOn(res, 'status');

describe('Social login', () => {
    it('Should mock the social login controller', async () => {
        await Auth.socialAuth({ user }, res);
        expect(res.status).toHaveBeenCalledWith(201);
    });

    it('Should mock the social login controller for an existing account', async () => {
        await Auth.socialAuth({ user }, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('Should mock the failing scenario when null values are provided', async () => {
        await Auth.socialAuth({ user: { ...user, id: "3456790876854", name: { givenName: null, familyName: null }, emails: null } }, res);
        expect(res.status).toHaveBeenCalledWith(201);
    });

    afterAll(async () => {
        await User.remove({});
        await Personal.remove({});
        await server.close();
        await mongoose.disconnect();
    });
});


