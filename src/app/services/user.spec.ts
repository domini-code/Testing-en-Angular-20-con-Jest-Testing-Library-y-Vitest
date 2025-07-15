import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { User, UserService } from './user';

const mockUsers: User[] = [
  { id: '1', name: 'User 1', email: 'user1@email.com' },
  { id: '2', name: 'User 2', email: 'user2@email.com' },
];

const mockUser: User = { id: '1', name: 'User 1', email: 'user1@email.com' };

describe('UserService', () => {
  let userService: UserService;
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: HttpClient, useValue: httpClientMock },
      ],
    });

    userService = TestBed.inject(UserService);
  });

  it('Gets an user by id', (done) => {
    httpClientMock.get.mockReturnValue(of(mockUser));
    userService.getUserById('1').subscribe((user: User) => {
      expect(user).toEqual(mockUser);
      expect(httpClientMock.get).toHaveBeenLastCalledWith('/api/users/1');
      done();
    });
  });
  it('Gets all users', (done) => {
    httpClientMock.get.mockReturnValue(of(mockUsers));
    userService.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
      expect(httpClientMock.get).toHaveBeenCalledWith('/api/users');
      done();
    });
  });

  it('Adds an user', (done) => {
    const newUser = { id: '1', name: 'User 1', email: 'user1@email.com' };
    httpClientMock.post.mockReturnValue(of(mockUser));

    userService.createUser(newUser).subscribe((user: User) => {
      expect(user).toEqual(mockUser);
      expect(httpClientMock.post).toHaveBeenCalledTimes(1);
      expect(httpClientMock.post).toHaveBeenCalledWith('/api/users', {
        user: newUser,
      });
      done();
    });
  });

  it('Updates an user', (done) => {
    const updateUser = {
      id: '1',
      name: 'Update user 1',
      email: 'user1@email.com',
    };
    httpClientMock.put.mockReturnValue(of(updateUser));
    userService.updateUser(updateUser).subscribe((user: User) => {
      expect(user).toEqual(updateUser);
      // expect(httpClientMock.put).toHaveBeenCalled();
      expect(httpClientMock.put).toHaveBeenCalledWith('/api/users/1', {
        user: updateUser,
      });
      done();
    });
  });

  it('Deletes an user', (done) => {
    httpClientMock.delete.mockReturnValue(of(undefined));
    userService.deleteUser('2').subscribe((result) => {
      expect(result).toBeUndefined();
      expect(httpClientMock.delete).toHaveBeenCalledWith('/api/users/2');
      done();
    });
  });
});
