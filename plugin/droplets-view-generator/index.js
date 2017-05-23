'use strict';

const path = require('path');
const fs = require('fs');

function create(item) {
	fs.mkdirSync(item.path, function (err) {
		if (err) throw err;
	});
	let file;
	for (let i = 0; i < item.files.length; i++) {
		file = item.files[i];
		fs.writeFileSync(path.join(item.path, file), '', function (err) {
			if (err) throw err;
		});
	}
}

class PackageGenerator {

	constructor(name) {
		this.name = name;
		this.package = {
			lib: {
				path: path.join(this.name, 'lib'),
				files: [this.name + '.jsx']
			},
			keymaps: {
				path: path.join(this.name, 'keymaps'),
				files: [this.name + '.json']
			},
			menus: {
				path: path.join(this.name, 'menus'),
				files: [this.name + '.json']
			},
			styles: {
				path: path.join(this.name, 'styles'),
				files: [this.name + '.scss']
			}
		};
	}

	generate() {
		fs.mkdirSync(this.name, function (err) {
			if (err) throw err;
		});
		create(this.package.lib);
		create(this.package.keymaps);
		create(this.package.menus);
		create(this.package.styles);
	}
}

module.exports = PackageGenerator;

