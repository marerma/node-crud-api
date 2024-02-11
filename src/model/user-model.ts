import { CustomError } from '../services/Custom-error.service';
import { USERS_DATA } from '../data/data';
import { STATUS_CODES } from '../services/Status-errors';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { ErrorMessages } from '../services/Error-messages';
import { User, NewUser } from '../data/users.types';
import { getAppStatus } from '../services/config';

const { isMultiMode } = getAppStatus();

export const findUsers = async (): Promise<User[]> => {
  if (isMultiMode) {
    process.send(USERS_DATA);
  }
  return USERS_DATA.users;
};

export const findUserById = async (
  id: string,
): Promise<User | null | CustomError> => {
  if (!uuidValidate(id)) {
    throw new CustomError(STATUS_CODES.BAD_REQUEST, ErrorMessages.INVALID_ID);
  }
  const user = USERS_DATA.users.find((user) => user.id === id) || null;

  if (!user) {
    throw new CustomError(STATUS_CODES.NOT_FOUND, ErrorMessages.NO_USER);
  }
  if (isMultiMode) {
    process.send(USERS_DATA);
  }
  return user;
};

export const createUser = async (
  user: NewUser,
): Promise<User | CustomError> => {
  if (!user) {
    throw new CustomError(STATUS_CODES.NO_CONTENT, ErrorMessages.INVALID_DATA);
  }
  const id = uuidv4();
  const newUser = { ...user, id };
  USERS_DATA.users.push(newUser);
  if (isMultiMode) {
    process.send(USERS_DATA);
  }
  return newUser;
};

export const updateUser = async (
  id: string,
  newData: NewUser,
): Promise<User | CustomError> => {
  if (!uuidValidate(id)) {
    throw new CustomError(STATUS_CODES.BAD_REQUEST, ErrorMessages.INVALID_ID);
  }

  const currentUserInd = USERS_DATA.users.findIndex((user) => user.id === id);

  if (currentUserInd === -1) {
    throw new CustomError(STATUS_CODES.NOT_FOUND, ErrorMessages.NO_USER);
  }

  const updatedUser = { id: USERS_DATA.users[currentUserInd].id, ...newData };
  USERS_DATA.users[currentUserInd] = updatedUser;
  if (isMultiMode) {
    process.send(USERS_DATA);
  }
  return updatedUser;
};

export const deleteUser = async (id: string): Promise<void | CustomError> => {
  if (!uuidValidate(id)) {
    throw new CustomError(STATUS_CODES.BAD_REQUEST, ErrorMessages.INVALID_ID);
  }

  const currentUserInd = USERS_DATA.users.findIndex((user) => user.id === id);
  if (currentUserInd === -1) {
    throw new CustomError(STATUS_CODES.NOT_FOUND, ErrorMessages.NO_USER);
  }
  USERS_DATA.users.splice(currentUserInd, 1);
  if (isMultiMode) {
    process.send(USERS_DATA);
  }
};
