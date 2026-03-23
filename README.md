# 贪吃蛇游戏

一款基于浏览器的经典贪吃蛇游戏，支持三种皮肤、三种难度等级、本地排行榜，以及流畅的键盘和触屏操作。

**在线体验：** https://snakegame.tkvern.com

---

## 技术栈

- **前端：** 原生 HTML5 + CSS3 + JavaScript（无框架依赖）
- **后端：** Node.js + Express
- **部署：** Cloudflare Pages
- **构建产物：** 纯静态文件 (`dist/`)

---

## 功能特色

| 功能 | 说明 |
|------|------|
| 蛇皮肤 | 三种视觉风格：经典 / 霓虹 / 彩虹 |
| 难度选择 | 简单 / 普通 / 困难，对应不同移动速度 |
| 排行榜 | 本地 Top 10 分数展示（通过 API 持久化） |
| 操作方式 | 键盘（方向键 / WASD）、触屏滑动、空格暂停 |
| 响应式 | 适配桌面端与移动端 |

---

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器（监听 127.0.0.1:3000）
npm start
```

访问 http://localhost:3000 即可开始游戏。

> 本地模式使用 `scores.json` 文件存储分数，无需数据库。

---

## Cloudflare Pages 部署

1. 在 GitHub 上创建仓库并将代码推送到 `main` 分支。

2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)，进入 **Pages** → **创建项目** → 连接你的 GitHub 仓库。

3. 配置构建设置：

   - **构建命令：** `npm run build`
   - **构建输出目录：** `dist`

4. 设置自定义域名（可选）：在 Pages 项目的 **自定义域名** 中添加你的域名。

5. 触发部署后，项目将自动构建并发布到 Cloudflare Pages。

> 部署使用 `wrangler.toml` 中的配置，站点名称为 `snakegame`，生产环境路由指向 `snakegame.tkvern.com`。

---

## 项目结构

```
snake-game/
├── index.html          # 游戏主页面（包含所有 HTML/CSS/JS）
├── server.js           # Express 服务器（API + 静态文件服务）
├── package.json        # 项目配置与脚本
├── wrangler.toml       # Cloudflare Pages 配置
├── scores.json         # 分数数据存储（运行后自动生成）
└── dist/               # 构建产物目录
    └── index.html      # 部署用静态文件
```

---

## 游戏玩法

- **移动：** 方向键 / WASD（桌面端）；在画布上滑动（移动端）
- **暂停：** 按空格键
- **目标：** 控制蛇吃食物，每吃一个身体增长一节，速度加快
- **结束：** 蛇撞到墙壁或自己的身体

分数将在游戏结束后提交到排行榜。

---

## License

MIT
