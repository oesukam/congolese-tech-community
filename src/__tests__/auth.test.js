import mongoose from 'mongoose';
import Auth from '../controllers/auth';
import Users from '../models/Users';
import server from '../index';

const user = {
    id: "2673546576879",
    emails: [{ value: "grace.lungu.me@gmail.com" }],
    photos: [{ value: "https://image.jpg" }],
    displayName: "grace",
}

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
        user.id = "346576865768708";
        user.emails = null;
        await Auth.socialAuth({ user }, res);
        expect(res.status).toHaveBeenCalledWith(201);
    });

    it('Should mock the failing scenario when the id is an integer', async () => {
        user.id = 3465768;
        await Auth.socialAuth({ user }, res);
        expect(res.status).toHaveBeenCalledWith(500);
    });

});

afterAll(async () => {
    await Users.remove({});
    await server.close();
    await mongoose.disconnect();
});
