import { NewUser } from '../data/users.types';
import { CustomError } from '../services/Custom-error.service';
import { ErrorMessages } from '../services/Error-messages';
import { STATUS_CODES } from '../services/Status-errors';

export const validateUserData = (userData: string): boolean => {
  let userDataObj: NewUser;
  try {
    userDataObj = JSON.parse(userData) as NewUser;
  } catch {
    throw new CustomError(STATUS_CODES.BAD_REQUEST, ErrorMessages.INVALID_DATA);
  }

  const requiredKeys = ['username', 'age', 'hobbies'];
  const hasAllKeys = requiredKeys.every((key) =>
    userDataObj.hasOwnProperty(key),
  );

  if (
    hasAllKeys &&
    typeof userDataObj.username === 'string' &&
    typeof userDataObj.age === 'number' &&
    Array.isArray(userDataObj.hobbies) &&
    userDataObj.hobbies.every((hobby: unknown) => typeof hobby === 'string')
  ) {
    return true;
  } else {
    return false;
  }
};
