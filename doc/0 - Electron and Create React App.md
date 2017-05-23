Electron and Create React App
=============================

原文在[这里](https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c)哦!!

## 方式

1. 运行 `create-react-app` 去创建一个基本的 React 应用
2. 运行 `npm install --save-dev electron`
3. 从 [electron-quick-starter](https://github.com/electron/electron-quick-start) 获取 `main.js`，添加到项目中
4. 修改 `main.js` 的 `mainWindow.loadRUL` 去使用 `localhost:3000`(webpack-dev-server)
5. 在 `package.json` 添加 `main` 入口和 `electron` 启动脚本
6. 运行 `npm start`
7. 运行 `npm run electron`

这样当我们在对 React 代码进行更改的时候，我们能够实时的在 Electron 应用中看到改变。但是这样做也有缺点：

1. 在生产环境中是没有使用 `webpack-dev-server`，这样意味着用到编译好的静态文件
2. 运行两个 npm 命令

## 动态指定 loadURL

修改 npm 的运行目标到 `package.json`：

```json
"electron-dev": "ELECTRON_START_URL=http://localhost:3000 electron ."
```

如果是 Windows 系统，如下：

```
"electron-dev": "set ELECTRON_START_URL=http://localhost:3000 && electron ."
```

接着修改 `electron-starter.js`：

```js
const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  })

mainWindow.loadURL(startUrl)
```

但是有个问题，就是 `create-react-app` 通过 `build` 构建出来的 `build/index.html` 文件，里面的资源路径是绝对路径，这导致了加载资源的失败，幸运的是，我们可以通过修改 `package.json`，如下：

```json
"homepage": "./"
```

当我们运行 `npm run build` 时，将会使用相对路径。

### 用 Foreman 去管理 React 和 Electron 进程

为了方便，我不想

1. 启动或管理 `React dev server` 和 `Electron` 进程
2. 等待 React dev server 启动后，接着启动 Electron

幸运的是，我们可以用一个不错的进程管理工具 [Foremen](https://github.com/strongloop/node-foreman)，在项目中安装如下：

```
npm install --save-dev foreman
```


添加配置文件 `Procfile`，内容如下：

```
react: npm start
electron: npm run electron-dev
```

这样我们就解决了问题 `1`，对于问题 `2`，我们需要添加一个脚本 `electron-wait-react.js`，用来等待 React dev server 启动后才启动 Electron：

```js
#!/usr/bin/env node
const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({port: port}, () => {
	client.end();
	if (!startedElectron) {
		console.log('Starting electron');
		startedElectron = true;
		const exec = require('child_process').exec;
		exec('npm run electron');
	}
}
);

tryConnection();

client.on('error', () => {
	setTimeout(tryConnection, 1000);
});

```

修改 `Procfile`：

```
react: BROWSER=none npm start
electron: node src/electron-wait-react
```

> 『BROWSER=none』 可以在启动 webpack-dev-server 后，不打开浏览器

修改 `package.json` 替换 `electron-dev`：

```json
"dev" : "nf start"
```

然后可以很方便的启动：

```
npm run dev
```
