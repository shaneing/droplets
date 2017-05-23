const request = require('superagent');
const u = require('url');

let auth = false;

class DropletsApi {
  constructor({
    protocol = 'http',
    hostname = 'api.droplets.me',
    pathPrefix = '',
    headers = {},
  }) {
    const urlObj = {
      hostname,
      protocol,
      port: protocol === 'http' ? 80 : 443,
      path: pathPrefix,
    };
    this.url = u.format(urlObj);
    this.header = headers;
    this.authorization = new Authorization({
      url: u.format(urlObj),
    });
    this.note = new Note({
      url: u.format(urlObj),
    });
    this.user = new User({
      url: u.format(urlObj),
    });
  }
}


class User {
  constructor({
    url,
    path = 'users',
  }) {
    this.url = u.resolve(url, path);
  }

  create({
    username,
    password,
    callback
  }) {
    request.post(this.url)
    .type('form')
    .send({
      username,
      password
    })
    .end((err, res) => {
      if (callback) {
        callback(err, res);
      }
    });
  }

}

class Note {
  constructor({
    url,
    path = 'notes',
  }) {
    this.url = u.resolve(url, path);
  }

  create({
    title,
    path,
    tags,
    author,
    date,
    content,
    callback,
  }) {
    if (auth) {
      request.post(this.url)
      .set('Authorization', `${auth.username}&${auth.token}`)
      .type('form')
      .send({
        title,
        path,
        tags,
        author,
        date,
        content,
      })
      .end((err, res) => {
        if (callback) {
          callback(err, res);
        }
      });
    }
  }
}

class Authorization {
  constructor({
    url,
    path = 'authorizations',
  }) {
    this.url = u.resolve(url, path);
  }

  create({username, password, callback}) {
    request.post(this.url)
    .type('form')
    .send({
      username,
      password
    })
    .end((err, res) => {
      if (!err) {
        auth = res.body;
      }
      if (callback) {
        callback(err, res);
      }
    });
  }
}


module.exports = DropletsApi;
