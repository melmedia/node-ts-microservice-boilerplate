#!/usr/bin/env node
import '../bootstrap';
import { Connection } from 'typeorm';
import { di, components } from '@c7s/node-framework';
import { app, modules } from '../console';
import { Type } from '../Type';

app.init().then(() => {
  const dbConfig = (new components.DbConnectionFactory).getConfig(modules);
  process.stdout.write(JSON.stringify(dbConfig));
  di.container.get<Connection>(Type.DbConnection).close();
});
