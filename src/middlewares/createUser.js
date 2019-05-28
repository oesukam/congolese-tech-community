import request from 'supertest';
import { urlPrefix } from '../__mocks__/variables';
import { organizationUser } from '../__mocks__/dummyData';
import app from '../app';
import { Chat, User } from '../models';

const user = async () => {

    const { username } = organizationUser;
    await Chat.deleteMany({});
    await User.deleteOne({ username });

    const res = await request(app)
        .post(`${urlPrefix}/auth/signup`)
        .send(organizationUser);
    const { token } = res.body;
    request(app).get(`${urlPrefix}/auth/verification/${token}`);
    return res.body;
}

export default user;