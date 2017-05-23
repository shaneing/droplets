Create React App Add CSS Preprocessor
=====================================

[TOC]

## Sass

安装 Sass 相关的命令行工具：

```
npm install node-sass-chokidar --save-dev
```

修改 `package.json` 文件：

```json
   "scripts": {
+    "build-css": "node-sass-chokidar src/ -o src/",
+    "watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive",
     "start": "react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test --env=jsdom",
```

如果通过运行 `npm run watch-css`，那么 Sass 文件的目录下对应会生成一个 CSS 文件，如果 `scss` 文件发生变动，那么会重新生成。

如果你想在 Sass 文件中导入共享的变量，那么可以添加 `--include-path` 选项：

```json
"build-css": "node-sass-chokidar --include-path static/ src/ -o src/",
"watch-css": "npm run build-css && node-sass-chokidar --include-path static src/ -o src/ --watch --recursive"
```

另外，为了在 `scripts` 中能使用 `&&` 操作符，还需要：

```
npm install --save-dev npm-run-all
```

最后，修改 scripts 中的 `start` 和 `build`：

```
   "scripts": {
     "build-css": "node-sass-chokidar src/ -o src/",
     "watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive",
-    "start": "react-scripts start",
-    "build": "react-scripts build",
+    "start-js": "react-scripts start",
+    "start": "npm-run-all -p watch-css start-js",
+    "build": "npm run build-css && react-scripts build",
     "test": "react-scripts test --env=jsdom",
     "eject": "react-scripts eject"
   }
```






