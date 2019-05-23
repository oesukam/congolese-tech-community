import slugString from '../../helpers/slugString';

describe('slugString()', () => {
  test('should return a string', () => {
    expect(slugString('Title')).toBeDefined();
  });
});
