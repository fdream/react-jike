# react-jike（React + Vite）

> ✨ 一个仿 `jike/juejin` 风格的前端练习：`React` + `Ant Design` + `富文本`，让你用项目来巩固知识。
> 🚀 登录后可进行文章管理与发布。

一个仿 `jike/juejin` 风格的前端练习项目：包含登录、文章列表、发布文章、富文本编辑、封面上传等功能。

## 技术栈 🧰

- React（当前版本：`^19.2.4`）⚛️
- React Router（`react-router-dom`）🧭
- Redux Toolkit（状态管理：登录 token 与用户信息）🗂️
- Ant Design（UI 组件）🎨
- Axios（统一请求封装）📡
- ECharts（首页图表展示）📊
- React Quill（富文本编辑）✍️

## 功能概览 ✨

1. 登录页（`/login`）🔐
   - 输入 `mobile` + `code` 后调用后端登录接口
   - 登录成功后保存 `token`，并跳转到主页
2. 布局页（`/` 下的子路由）🧩
   - 顶部显示用户名与退出登录
   - 左侧菜单包含：`首页` / `文章管理` / `创建文章`
   - 进入布局后会自动拉取用户信息
3. 首页（`/home`）🏠
   - 使用 ECharts 展示柱状图示例
4. 文章管理（`/article`）📰
   - 表格展示文章列表（封面、标题、状态、发布时间、阅读/评论/点赞数等）
   - 页面提供筛选表单（状态/频道/日期），但当前示例未将筛选条件用于接口请求
5. 发布文章（`/publish`）✍️
   - 表单包含：标题、频道、封面上传（单图/三图/无图）、富文本内容
   - 点击提交后调用发布文章接口

## 路由说明

- `GET /login`：登录页
- `/`：布局入口
  - `/home`：首页
  - `/article`：文章管理
  - `/publish`：发布文章

## 后端接口约定（来自 `src/apis`）

> 统一请求基础地址：`http://geek.itheima.net/v1_0`

### 认证

- 登录：`POST /authorizations`
  - 请求体：`{ mobile, code }`
  - 成功响应：返回 `token`
- 获取用户信息：`GET /user/profile`
  - 需带 `Authorization: Bearer <token>`

### 文章/频道

- 文章频道列表：`GET /channels`
  - 用于发布文章/文章管理页面的频道选择
- 获取文章列表：`GET /mp/articles`
  - 支持传参：由 `getArticleListAPI(params)` 透传到 querystring
- 发布文章：`POST /mp/articles?draft=false`
  - 请求体（示例）：`{ title, content, channel_id, cover: { type, images } }`

### 封面上传

- 上传接口（AntD Upload 的 `action`）：`http://geek.itheima.net/v1_0/upload`
  - 上传成功后，页面从 `response.data.url` 中取出图片地址

## Token 存储

- 本地存储 key：`token_key`
- 请求拦截器会在本地存在 token 时自动追加：
  - `Authorization: Bearer ${token}`

## 本地运行 🏃

1. 安装依赖
   - `npm install`
2. 启动开发服务
   - `npm run dev`
3. 构建
   - `npm run build`
4. 预览
   - `npm run preview`

## 项目结构（简要）

- `src/apis/`：接口封装（`article.jsx`、`user.jsx`）
- `src/store/`：用户状态管理（登录 token、用户信息）
- `src/hooks/`：通用 hooks（如频道列表 `useChannel`）
- `src/pages/`：页面入口（`Login`、`Home`、`Article`、`Publish`、`Layout`）

