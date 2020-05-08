import { Types } from 'mongoose';
import ProfileService from "../../services/profileService"
import mocks from '../../__mocks__/dummyData';

describe('ProfileService', () => {
  const service = new ProfileService(mocks.userModel, mocks.followModel);

  it('gets the full profile', async () => {
    jest.spyOn(service, 'getCompleteProfile');
    const profile = await service.getCompleteProfile('username');
    expect(service.getCompleteProfile).toHaveBeenCalledWith('username');
    expect(profile).toEqual(mocks.personData);
  })

  it('gets the followers list', async () => {
    jest.spyOn(service, 'getFollowersFollowing');
    jest.spyOn(Types, 'ObjectId').mockReturnValueOnce('1');
    const data = await service.getFollowersFollowing('1', 'follower', 'followed');
    expect(service.getFollowersFollowing).toHaveBeenCalledWith('1', 'follower', 'followed');
    expect(data).toEqual({ followers: [mocks.personData], following: [mocks.personData] });
  })
})