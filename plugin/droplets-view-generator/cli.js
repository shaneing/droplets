#!/usr/bin/env node
function getArgs() {
	return process.argv.splice(2);
}

function getPackageName() {
	return getArgs()[0];
}

let PackageGenerator = require('./');
const pg = new PackageGenerator(getPackageName());
pg.generate();
