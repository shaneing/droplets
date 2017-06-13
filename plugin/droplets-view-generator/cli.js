#!/usr/bin/env node

const args = process.argv.splice(2);

function getPackageName() {
  return args[0];
}

const getClassName = () => args[1];

const PackageGenerator = require('./');

const pg = new PackageGenerator(getPackageName(), getClassName());
pg.generate();
