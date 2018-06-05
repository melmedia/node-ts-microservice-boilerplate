#!/usr/bin/env node
import '../bootstrap';
import { components } from '@c7s/node-ts-framework';
import { app, modules } from '../console';

app.run(() => {
  const dbConfig = (new components.DbConnectionFactory).getConfig(modules);
  process.stdout.write(JSON.stringify(dbConfig));
});
