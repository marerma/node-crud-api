import { IncomingMessage, ServerResponse } from 'http';
import { updateUser } from '../model/user-model';
import { CustomError } from '../services/Custom-error.service';
import { STATUS_CODES } from '../services/Status-errors';
import { validateUserData } from '../utils/validate-user-data';
import { notValidBodyHandler, serverErrorHandler } from './utils';

export const putUser = async (
  res: ServerResponse<IncomingMessage>,
  id: string,
  body: string,
) => {
  try {
    if (validateUserData(body)) {
      const updatedUser = await updateUser(id, JSON.parse(body));
      res.writeHead(STATUS_CODES.OK, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updatedUser));
    } else {
      notValidBodyHandler(res);
    }
  } catch (err) {
    if (err instanceof CustomError) {
      res.writeHead(err.statusCode, { 'Content-Type': 'application/json' });
      res.end(err.message);
    }
    serverErrorHandler(res);
  }
};
