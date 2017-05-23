Droplets
========

Droplets，是用 [Electron](https://github.com/electron/electron) 和 [React](https://facebook.github.io/react/) 构建的桌面应用。

![Droplets 示例图](https://github.com/shaneing/droplets/raw/master/doc/image/droplets-visitor-home.jpg)

## 构建

```
npm run build
npm run electron
```

## 开发

```
npm run dev
```

## 应用背景及其展望

这几年大学中中，我一开始像大多数人一样在纸上做笔记，然后经过某人引导转到了在电脑上做笔记，而那时做的只是纯文本笔记，后来也发现问题：

- 笔记排版烂
- 可读性差

幸运的是，在机缘巧合之下发现了 Markdown 标记语言，这种语言：

- 简单而且渲染后的效果很好
- 不用更多的关注排版

因此喜欢上了 Markdown，并用它去写笔记。于是

> 我想开发一个满足我需求的笔记应用

但是，在开发这个应用时，发现

- 难度大
- 一个人精力有限

因此，我恳求对 Markdown 笔记有兴趣的同学，在空闲时，一起来『建筑』。我想未来要添加的功能：

- 编辑器优化
- 同步

要思考的：

- 如何把 [nodePPT](https://github.com/ksky521/nodePPT) 整合进来
- 如何把 [Hexo](https://hexo.io/zh-cn/) 整合进来
- 创建类似 [GitBook](https://www.gitbook.com/)

最后，其实我的技术方向是服务器端，所以能力可能有限。

## 感谢

算法：

- [Boyer-Moore 字符串搜索算法](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_string_search_algorithm)

工具：

- [Materialize CSS](http://materializecss.com/)：基于 Material Design 的现代响应式前端框架
- [Create React APP](https://github.com/facebookincubator/create-react-app)：快速创建 React App