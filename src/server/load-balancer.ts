import http, { IncomingMessage, ServerResponse } from 'http';

const pipeWorkerResponse = (
  parentRes: ServerResponse<IncomingMessage>,
  workerRes: IncomingMessage,
) => {
  parentRes.writeHead(workerRes.statusCode, workerRes.statusMessage);
  workerRes.pipe(parentRes);
};

export const loadBalancer = (
  port: number,
  workerIndex: number,
  numCPUs: number,
) => {
  return (
    sourceReq: IncomingMessage,
    sourceRes: ServerResponse<IncomingMessage>,
  ) => {
    const nextPort = port + ((workerIndex + 1) % numCPUs);
    workerIndex++;
    const targetPath = {
      port: nextPort,
      path: sourceReq.url,
      method: sourceReq.method,
      headers: sourceReq.headers,
    };

    const targetRequest = http.request(
      targetPath,
      (response: IncomingMessage) => {
        pipeWorkerResponse(sourceRes, response);
      },
    );
    sourceReq.pipe(targetRequest);
  };
};
