const bcrypt = require('bcrypt');
const {
  createUser,
  getAllUsers,
  getUser,
  getUserById,
  getUserByUsername
} = require('../db'); // Replace 'your-file' with the actual file name containing the code

jest.mock('../db/client', () => ({
  query: jest.fn()
}));

describe('User Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user and return user object', async () => {
      // Mock the client query response
      const mockClientQuery = jest.fn(() => ({
        rows: [{ id: 1, username: 'testuser', email: 'test@example.com', isAdmin: false }]
      }));
      const client = require('../db/client');
      client.query.mockImplementation(mockClientQuery);

      // Mock bcrypt hash function
      const mockBcryptHash = jest.fn(password => Promise.resolve(`hashed_${password}`));
      bcrypt.hash = mockBcryptHash;

      // Test the createUser function
      const user = await createUser({
        username: 'testuser',
        password: 'password123',
        email: 'test@example.com',
        isAdmin: false
      });

      expect(mockBcryptHash).toHaveBeenCalledWith('password123', 10); // Ensure bcrypt.hash is called with the correct arguments
      expect(client.query).toHaveBeenCalledWith(
        `INSERT INTO users(username, password, email, isAdmin)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (username) DO NOTHING
        RETURNING id, username, email, isAdmin`,
        ['testuser', 'hashed_password123', 'test@example.com', false]
      ); // Ensure client.query is called with the correct SQL query and parameters
      expect(user).toEqual({
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        isAdmin: false
      }); // Ensure the function returns the expected user object
    });

    it('should throw an error if an error occurs during user creation', async () => {
      // Mock the client query to throw an error
      const mockClientQuery = jest.fn(() => {
        throw new Error('Database error');
      });
      const client = require('../db/client');
      client.query.mockImplementation(mockClientQuery);

      // Test the createUser function
      await expect(
        createUser({
          username: 'testuser',
          password: 'password123',
          email: 'test@example.com',
          isAdmin: false
        })
      ).rejects.toThrow('Database error'); // Ensure the function throws the expected error message
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      // Mock the client query response
      const mockClientQuery = jest.fn(() => ({
        rows: [
          { id: 1, username: 'user1', email: 'user1@example.com', isAdmin: false },
          { id: 2, username: 'user2', email: 'user2@example.com', isAdmin: true }
        ]
      }));
      const client = require('../db/client');
      client.query.mockImplementation(mockClientQuery);

      // Test the getAllUsers function
      const users = await getAllUsers();

      expect(client.query).toHaveBeenCalledWith('SELECT * FROM users'); // Ensure client.query is called with the correct SQL query
      expect(users).toEqual([
        { id: 1, username: 'user1', email: 'user1@example.com', isAdmin:false },
        { id: 2, username: 'user2', email: 'user2@example.com', isAdmin: true }
      ]); // Ensure the function returns the expected array of users
    });

    it('should throw an error if an error occurs while fetching users', async () => {
      // Mock the client query to throw an error
      const mockClientQuery = jest.fn(() => {
        throw new Error('Database error');
      });
      const client = require('../db/client');
      client.query.mockImplementation(mockClientQuery);

      // Test the getAllUsers function
      await expect(getAllUsers()).rejects.toThrow('Database error'); // Ensure the function throws the expected error message
    });
  });

  describe('getUser', () => {
    it('should return user object if username and password match', async () => {
      // Mock the client query response
      const mockClientQuery = jest.fn(() => ({
        rows: [{ id: 1, username: 'testuser', password: 'hashed_password123' }]
      }));
      const client = require('../db/client');
      client.query.mockImplementation(mockClientQuery);

      // Mock bcrypt compare function
      const mockBcryptCompare = jest.fn((password, hashedPassword) => Promise.resolve(password === hashedPassword));
      bcrypt.compare = mockBcryptCompare;

      // Test the getUser function
      const user = await getUser({ username: 'testuser', password: 'password123' });

      expect(mockBcryptCompare).toHaveBeenCalledWith('password123', 'hashed_password123'); // Ensure bcrypt.compare is called with the correct arguments
      expect(client.query).toHaveBeenCalledWith(
        `SELECT * FROM users WHERE username = $1`,
        ['testuser']
      ); // Ensure client.query is called with the correct SQL query and parameters
      expect(user).toEqual({ id: 1, username: 'testuser' }); // Ensure the function returns the expected user object
    });

    it('should return null if username and password do not match', async () => {
      // Mock the client query response
      const mockClientQuery = jest.fn(() => ({
        rows: [{ id: 1, username: 'testuser', password: 'hashed_password123' }]
      }));
      const client = require('../db/client');
      client.query.mockImplementation(mockClientQuery);

      // Mock bcrypt compare function to return false
      const mockBcryptCompare = jest.fn(() => Promise.resolve(false));
      bcrypt.compare = mockBcryptCompare;

      // Test the getUser function
      const user = await getUser({ username: 'testuser', password: 'wrongpassword' });

      expect(mockBcryptCompare).toHaveBeenCalledWith('wrongpassword', 'hashed_password123'); // Ensure bcrypt.compare is called with the correct arguments
      expect(client.query).toHaveBeenCalledWith(
        `SELECT * FROM users WHERE username = $1`,
        ['testuser']
      ); // Ensure client.query is called with the correct SQL query and parameters
      expect(user).toBeNull(); // Ensure the function returns null
    });

    it('should throw an error if an error occurs during user retrieval', async () => {
      // Mock the getUserByUsername function to throw an error
      const mockGetUserByUsername = jest.fn(() => {
        throw new Error('Database error');
      });
      getUserByUsername.mockImplementation(mockGetUserByUsername);

      // Test the getUser function
      await expect(getUser({ username: 'testuser', password: 'password123' })).rejects.toThrow('Database error'); // Ensure the function throws the expected error message
    });
  });

  describe('getUserById', () => {
    it('should return user object if user exists', async () => {
      // Mock the client query response
      const mockClientQuery = jest.fn(() => ({
        rows: [{ id: 1, username: 'testuser' }]
      }));
      const client = require('../db/client');
      client.query.mockImplementation(mockClientQuery);

      // Test the getUserById function
      const user = await getUserById(1);

      expect(client.query).toHaveBeenCalledWith(
        `SELECT id, username FROM users WHERE id=${1}`
      ); // Ensure client.query is called with the correct SQL query
      expect(user).toEqual({ id: 1, username: 'testuser' }); // Ensure the function returns the expected user object
    });

    it('should return null if user does not exist', async () => {
      // Mock the client query response
      const mockClientQuery = jest.fn(() => ({
        rows: []
      }));
      const client = require('../db/client');
      client.query.mockImplementation(mockClientQuery);

      // Test the getUserById function
      const user = await getUserById(1);

      expect(client.query).toHaveBeenCalledWith(
        `SELECT id, username FROM users WHERE id=${1}`
      ); // Ensure client.query is called with the correct SQL query
      expect(user).toBeNull(); // Ensure the function returns null
    });

    it('should throw an error if an error occurs during user retrieval', async () => {
      // Mock the client query to throw an error
      const mockClientQuery = jest.fn(() => {
        throw new Error('Database error');
      });
      const client = require('../db/client');
      client.query.mockImplementation(mockClientQuery);

      // Test the getUserById function
      await expect(getUserById(1)).rejects.toThrow('Database error'); // Ensure the function throws the expected error message
    });
  });

  describe('getUserByUsername', () => {
    it('should return user object if user exists', async () => {
      // Mock the client query response
      const mockClientQuery = jest.fn(() => ({
        rows: [{ id: 1, username: 'testuser' }]
      }));
      const client = require('../db/client');
      client.query.mockImplementation(mockClientQuery);

      // Test the getUserByUsername function
      const user = await getUserByUsername('testuser');

      expect(client.query).toHaveBeenCalledWith(
        `SELECT * FROM users WHERE username = $1`,
        ['testuser']
      ); // Ensure client.query is called with the correct SQL query and parameters
      expect(user).toEqual({ id: 1, username: 'testuser' }); // Ensure the function returns the expected user object
    });

    it('should throw an error if an error occurs during user retrieval', async () => {
      // Mock the client query to throw an error
      const mockClientQuery = jest.fn(() => {
        throw new Error('Database error');
      });
      const client = require('../db/client');
      client.query.mockImplementation(mockClientQuery);

      // Test the getUserByUsername function
      await expect(getUserByUsername('testuser')).rejects.toThrow('Database error'); // Ensure the function throws the expected error message
    });
  });
});
