import { IncomingMessage, ServerResponse } from 'http';
import { getUserIdFromUrl } from '../utils/get-id-from-url';
import { getUserById, getUserList } from './get-users';
import { postUser } from './post-user';
import { parseReqBody } from '../utils/parse-req-body';
import { putUser } from './put-user';
import { STATUS_CODES } from '../services/Status-errors';
import { ErrorMessages } from '../services/Error-messages';
import { removeUser } from './delete-user';
import { BASE_URL } from '../services/config';
import { notFoundHandler } from './utils';

export const routeHandler = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => {
  const { url, method } = req;

  if (!url?.startsWith(BASE_URL)) {
    notFoundHandler(res);
  }
  const userId = getUserIdFromUrl(url);

  switch (method) {
    case 'GET':
      if (userId) {
        await getUserById(res, userId);
      } else {
        await getUserList(res);
      }
      break;
    case 'POST': {
      const body = await parseReqBody(req);
      await postUser(res, body);
      break;
    }

    case 'PUT': {
      if (userId) {
        const body = await parseReqBody(req);
        await putUser(res, userId, body);
      } else {
        res.writeHead(STATUS_CODES.BAD_REQUEST, {
          'Content-Type': 'application/json',
        });
        res.end(ErrorMessages.INVALID_ID);
      }
      break;
    }

    case 'DELETE': {
      if (userId) {
        await removeUser(req, res, userId);
      } else {
        res.writeHead(STATUS_CODES.BAD_REQUEST, {
          'Content-Type': 'application/json',
        });
        res.end(ErrorMessages.INVALID_ID);
      }
      break;
    }

    default:
      notFoundHandler(res);
      break;
  }
};
