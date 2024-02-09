import http from 'http';
import 'dotenv/config';
import { routeHandler } from './controller/route-handler';
import { serverErrorHandler } from './controller/utils';
import { CustomError } from './services/Custom-error.service';

const PORT = process.env.PORT;

const server = http.createServer((request, response) => {
  try {
    routeHandler(request, response);
  } catch (err) {
    if (err instanceof CustomError) {
      response.writeHead(err.statusCode, {
        'Content-Type': 'application/json',
      });
      response.end(err.message);
    }
    serverErrorHandler(response);
  }
});
server.listen(PORT, () => console.log(`listening on port ${PORT}`));
