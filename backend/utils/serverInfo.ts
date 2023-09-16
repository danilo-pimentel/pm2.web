import si from 'systeminformation';

import { ServerInfo } from '../types/utils.js';

export default async function getServerInfo(): Promise<ServerInfo> {
  const mem = await si.mem();
  return {
    name: (await si.osInfo())?.hostname ?? '',
    uuid: (await si.system())?.uuid || (await si.uuid())?.os || (await si.osInfo())?.hostname || '',
    stats: {
      cpu: (await si.currentLoad())?.currentLoad ?? 0,
      memory: mem?.used ?? 0,
      memoryMax: mem?.total ?? 0,
      uptime: (await si.time())?.uptime * 1000 ?? 0,
    },
    heartbeatAt: Date.now(),
  };
}
