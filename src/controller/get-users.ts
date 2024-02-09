import { CustomError } from '../services/Custom-error.service';
import { STATUS_CODES } from '../services/Status-errors';
import { IncomingMessage, ServerResponse } from 'http';
import { findUserById, findUsers } from '../model/user-model';

export const getUserList = async (res: ServerResponse<IncomingMessage>) => {
  try {
    const users = await findUsers();
    res.writeHead(STATUS_CODES.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (err) {
    if (err instanceof CustomError) {
      res.statusCode = err.statusCode;
      res.end(err.message);
    }
  }
};

export const getUserById = async (
  res: ServerResponse<IncomingMessage>,
  id: string,
) => {
  try {
    const user = await findUserById(id);
    res.writeHead(STATUS_CODES.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } catch (err) {
    if (err instanceof CustomError) {
      res.statusCode = err.statusCode;
      res.end(err.message);
    }
  }
};
