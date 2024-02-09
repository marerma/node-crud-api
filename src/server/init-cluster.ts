import { ErrorMessages } from '../services/Error-messages';
import {availableParallelism} from 'node:os';
import cluster from 'node:cluster';
import { initSingleServer } from './init-server';
import http from 'http';
import { loadBalancer } from './load-balancer';
import { USERS_DATA } from '../data/data';
import { UsersList } from '../data/users.types';


export const initCluster = (port:number) => {
  let counter = 0;
  const CPUs = availableParallelism(); 

  if (cluster.isPrimary){ 
   for (let i = 0; i < CPUs - 1; i++) { 
      const workerPort = port + 1 + i;
      const worker = cluster.fork({workerPort});

      worker.on('message', (message) => {
        const workers = cluster.workers;
        if (workers) {
          Object.keys(workers).forEach((id) => workers[id]?.send(message));
        }
      });
    } 
    const server = http.createServer(loadBalancer(port, counter, CPUs));

    server.listen(port, () => `Worker example is listening on port ${port}`);
    server.on('error', (err) =>
    console.error(`${ErrorMessages.SERVER}: ${err}}`)
  );
} else{ 
    initSingleServer(Number(process.env.workerPort));

    process.on('message', (message: UsersList) => {
      if (!message || !('users' in message)) return;
      USERS_DATA.users = message.users;
    });
 }
}