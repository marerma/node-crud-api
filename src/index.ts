import 'dotenv/config';
import { initSingleServer } from './server/init-server';
import { initCluster } from './server/init-cluster';
import { getAppStatus } from './services/config';

const PORT = process.env.PORT || 4000;
const {isMultiMode} = getAppStatus();
if (isMultiMode) {
  initCluster(Number(PORT))
} else {
  initSingleServer(Number(PORT));
}