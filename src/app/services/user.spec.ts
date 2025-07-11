import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user';

describe('UserService', () => {
  let userService: UserService;
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
      post: jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: HttpClient, useValue: httpClientMock },
      ],
    });

    userService = TestBed.inject(UserService);
  });
  describe('getUser', () => {
    it('Calls getUser', () => {
      const fakeGetUser = jest.fn().mockReturnValue({ name: 'Dominicode' });
      const service = { getUser: fakeGetUser };

      expect(service.getUser()).toEqual({ name: 'Dominicode' });
      expect(fakeGetUser).toHaveBeenCalled();
    });
  });
});
