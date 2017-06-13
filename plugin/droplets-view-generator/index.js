const path = require('path');
const fs = require('fs');

class PackageGenerator {

  constructor(name, className) {
    this.name = name;
    this.className = className;
    this.package = {
      lib: {
        path: path.join(this.name, 'lib'),
        files: [`${this.name}.jsx`],
        contents: [
          `import React from 'react';\n\nclass ${this.className} extends React.Component {\n\n}\n\n${this.className}.propTypes = {};\n${this.className}.defaultProps = {};\n\nexport default ${this.className};\nls
          `,
        ],
      },
      keymaps: {
        path: path.join(this.name, 'keymaps'),
        files: [`${this.name}.json`],
      },
      menus: {
        path: path.join(this.name, 'menus'),
        files: [`${this.name}.json`],
      },
      styles: {
        path: path.join(this.name, 'styles'),
        files: [`${this.name}.scss`],
        contents: [
          `.${this.name} {\n\n}`,
        ],
      },
    };
  }

  generate() {
    fs.mkdirSync(this.name, (err) => {
      if (err) throw err;
    });
    create(this.package.lib);
    create(this.package.keymaps);
    create(this.package.menus);
    create(this.package.styles);
  }
}

function create(item) {
  fs.mkdirSync(item.path, (err) => {
    if (err) throw err;
  });
  let file;
  let content;
  for (let i = 0; i < item.files.length; i += 1) {
    file = item.files[i];
    content = (item.contents && item.contents[i]) || '';
    fs.writeFileSync(path.join(item.path, file), content, (err) => {
      if (err) throw err;
    });
  }
}

module.exports = PackageGenerator;

