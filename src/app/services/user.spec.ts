describe('UserService', () => {
  it('Calls getUser', () => {
    const fakeGetUser = jest.fn().mockReturnValue({ name: 'Dominicode' });
    const service = { getUser: fakeGetUser };

    expect(service.getUser()).toEqual({ name: 'Dominicode' });
    expect(fakeGetUser).toHaveBeenCalled();
  });
});
