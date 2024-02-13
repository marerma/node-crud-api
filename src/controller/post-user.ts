import { IncomingMessage, ServerResponse } from 'http';
import { createUser } from '../model/user-model';
import { CustomError } from '../services/Custom-error.service';
import { STATUS_CODES } from '../services/Status-errors';
import { validateUserData } from '../utils/validate-user-data';
import { notValidBodyHandler, serverErrorHandler } from './utils';

export const postUser = async (
  res: ServerResponse<IncomingMessage>,
  body: string,
) => {
  try {
    if (validateUserData(body)) {
      const newUser = await createUser(JSON.parse(body));
      res.writeHead(STATUS_CODES.OK, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } else {
      notValidBodyHandler(res);
    }
  } catch (err) {
    if (err instanceof CustomError) {
      res.statusCode = err.statusCode;
      res.end(err.message);
    }
    serverErrorHandler(res);
  }
};
