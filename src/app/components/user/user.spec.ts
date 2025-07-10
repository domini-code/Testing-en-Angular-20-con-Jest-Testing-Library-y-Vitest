import { UserService } from '../../services/user';

jest.mock('../../services/user.ts', () => ({
  UserService: jest.fn().mockImplementation(() => ({
    getUser: jest.fn(() => ({
      name: 'MockedName',
    })),
  })),
}));
describe('UserComponent', () => {
  it('Returns the mocked name from the service', () => {
    const userService = new UserService();

    expect(userService.getUser()).toEqual({ name: 'MockedName' });
    expect(UserService).toHaveBeenCalledTimes(1);
    expect(userService.getUser).toHaveBeenCalledTimes(1);
  });

  it('Returns the getUser mocked', () => {
    const service = new UserService();

    const spy = jest
      .spyOn(service, 'getUser')
      .mockReturnValue({ name: 'MockedName' });

    expect(service.getUser()).toEqual({ name: 'MockedName' });
    expect(spy).toHaveBeenCalled();
  });
});
