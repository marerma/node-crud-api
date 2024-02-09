import { CustomError } from '../services/Custom-error.service';
import { STATUS_CODES } from '../services/Status-errors';
import { IncomingMessage, ServerResponse } from 'http';
import { deleteUser } from '../model/user-model';

export const removeUser = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  id: string,
) => {
  try {
    await deleteUser(id);
    res.writeHead(STATUS_CODES.NO_CONTENT);
    res.end();
  } catch (err) {
    if (err instanceof CustomError) {
      res.statusCode = err.statusCode;
      res.end(err.message);
    }
  }
};
