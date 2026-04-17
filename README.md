# react-jike（React + Vite）

> ✨ 前端练习：`React` + `Ant Design` + `富文本`，让你用项目来巩固知识。
> 🚀 登录后可进行文章管理与发布。

前端练习项目：包含登录、文章列表、发布文章、富文本编辑、封面上传等功能。

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
   - 支持编辑已有文章，自动回显文章内容和封面

### 认证

- 登录：`POST /authorizations`
  - 请求体：`{ mobile, code }`
  - 成功响应：返回 `token`
- 获取用户信息：`GET /user/profile`
  - 需带 `Authorization: Bearer <token>`


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
   - `npm run build`：构建开发版本
   - `npm run build:prod`：构建生产版本（包含更多优化）
4. 预览
   - `npm run preview`

## 项目结构（详细）

```
src/
├── apis/                 # 接口封装
│   ├── article.jsx       # 文章相关接口
│   └── user.jsx          # 用户相关接口
├── components/           # 通用组件
│   └── Layout/           # 布局组件
├── hooks/                # 自定义 hooks
│   └── useChannel.js     # 频道列表 hook
├── pages/                # 页面组件
│   ├── Login/            # 登录页
│   ├── Home/             # 首页
│   ├── Article/          # 文章管理页
│   ├── Publish/          # 发布/编辑文章页
│   └── Layout/           # 布局页
├── store/                # 状态管理
│   └── user.js           # 用户状态（token、用户信息）
├── utils/                # 工具函数
│   └── request.js        # axios 封装
├── App.jsx               # 应用入口
├── main.jsx              # 渲染入口
└── index.css             # 全局样式
```

## 核心功能实现

### 1. 登录与认证
- 使用 Redux Toolkit 管理用户状态
- 登录成功后将 token 存储到本地存储
- 请求拦截器自动添加 Authorization 头
- 路由守卫确保未登录用户只能访问登录页

### 2. 文章管理
- 表格展示文章列表，支持分页
- 筛选功能（状态、频道、日期）
- 编辑文章时自动回显内容

### 3. 发布文章
- 富文本编辑器（React Quill）
- 封面上传功能，支持单图、三图、无图模式
- 表单验证确保数据完整性
- 支持编辑已有文章

### 4. 图片上传
- 使用 Ant Design Upload 组件
- 上传成功后自动提取图片 URL
- 支持删除和重新上传

## 技术实现细节

### 状态管理
- 使用 Redux Toolkit 管理全局状态
- 主要管理用户信息和登录状态

### 网络请求
- 封装 Axios 实例，统一处理请求和响应
- 请求拦截器添加认证 token
- 响应拦截器统一处理错误

### 路由管理
- 使用 React Router v6 进行路由配置
- 实现嵌套路由和路由守卫

### 组件设计
- 采用函数组件和 Hooks
- 自定义 Hook 封装重复逻辑（如频道列表）
- 组件化设计，提高代码复用性

## 注意事项

1. 本项目使用的是模拟后端接口，实际使用时需要替换为真实接口
2. 登录功能需要输入正确的手机号和验证码（具体请参考后端接口文档）
3. 封面上传功能需要确保后端接口支持文件上传
4. 富文本编辑器的功能可能需要根据实际需求进行扩展

## 开发建议

1. 代码规范：遵循 React 最佳实践，使用 ESLint 进行代码检查
2. 性能优化：合理使用 React.memo、useMemo、useCallback 等优化渲染性能
3. 错误处理：完善错误边界和异常处理
4. 测试：添加单元测试和集成测试

## 许可证

本项目仅供学习和练习使用，遵循 MIT 许可证。

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

---

希望这个项目能帮助你巩固 React 相关知识，祝你学习愉快！ 🎉