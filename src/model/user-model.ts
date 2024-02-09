import { CustomError } from '../services/Custom-error.service';
import { USERS_DATA } from '../data/data';
import { STATUS_CODES } from '../services/Status-errors';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { ErrorMessages } from '../services/Error-messages';
import { User, NewUser } from '../data/users.types';

export const findUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => resolve(USERS_DATA.users));
};

export const findUserById = async (
  id: string,
): Promise<User | null | CustomError> => {
  return new Promise((resolve, reject) => {
    if (!uuidValidate(id)) {
      reject(
        new CustomError(STATUS_CODES.BAD_REQUEST, ErrorMessages.INVALID_ID),
      );
    }
    const user = USERS_DATA.users.find((user) => user.id === id) || null;

    if (!user) {
      reject(new CustomError(STATUS_CODES.NOT_FOUND, ErrorMessages.NO_USER));
    }
    resolve(user);
  });
};

export const createUser = async (
  user: NewUser,
): Promise<User | CustomError> => {
  return new Promise((resolve, reject) => {
    if (!user) {
      reject(
        new CustomError(STATUS_CODES.NO_CONTENT, ErrorMessages.INVALID_DATA),
      );
    }
    const id = uuidv4();
    const newUser = { ...user, id };
    USERS_DATA.users.push(newUser);
    resolve(newUser);
  });
};

export const updateUser = async (
  id: string,
  newData: NewUser,
): Promise<User | CustomError> => {
  return new Promise((resolve, reject) => {
    if (!uuidValidate(id)) {
      reject(
        new CustomError(STATUS_CODES.BAD_REQUEST, ErrorMessages.INVALID_ID),
      );
    }

    const currentUserInd = USERS_DATA.users.findIndex((user) => user.id === id);

    if (currentUserInd === -1) {
      reject(new CustomError(STATUS_CODES.NOT_FOUND, ErrorMessages.NO_USER));
    }

    const updatedUser = { id: USERS_DATA.users[currentUserInd].id, ...newData };
    USERS_DATA.users[currentUserInd] = updatedUser;
    resolve(updatedUser);
  });
};

export const deleteUser = async (id: string): Promise<void | CustomError> => {
  return new Promise((resolve, reject) => {
    if (!uuidValidate(id)) {
      reject(
        new CustomError(STATUS_CODES.BAD_REQUEST, ErrorMessages.INVALID_ID),
      );
    }

    const currentUserInd = USERS_DATA.users.findIndex((user) => user.id === id);
    if (currentUserInd === -1) {
      reject(new CustomError(STATUS_CODES.NOT_FOUND, ErrorMessages.NO_USER));
    }
    USERS_DATA.users.splice(currentUserInd, 1);
    resolve();
  });
};
