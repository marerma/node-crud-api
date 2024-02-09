import { ServerResponse, IncomingMessage } from 'http';
import { ErrorMessages } from '../services/Error-messages';
import { STATUS_CODES } from '../services/Status-errors';

export const notFoundHandler = (res: ServerResponse<IncomingMessage>) => {
  res.writeHead(STATUS_CODES.NOT_FOUND, { 'Content-Type': 'application/json' });
  res.end(ErrorMessages.NOT_FOUND);
};

export const serverErrorHandler = (res: ServerResponse<IncomingMessage>) => {
  res.writeHead(STATUS_CODES.SERVER, { 'Content-Type': 'application/json' });
  res.end(ErrorMessages.SERVER);
};

export const notValidBodyHandler = (res: ServerResponse<IncomingMessage>) => {
  res.writeHead(STATUS_CODES.BAD_REQUEST, {
    'Content-Type': 'application/json',
  });
  res.end(ErrorMessages.INVALID_DATA);
};
