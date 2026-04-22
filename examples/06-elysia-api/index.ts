/**
 * 示例 06：Elysia API
 *
 * 运行：
 *   bun run examples/06-elysia-api/index.ts
 *
 * 然后打开：
 *   http://localhost:3002
 *   http://localhost:3002/user/100
 *
 * Elysia 是 Bun 生态里常见的 Web 框架，写法类似 Express/Fastify。
 */

import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => "首页：Hello Elysia")
  .get("/user/:id", ({ params }) => {
    return {
      id: params.id,
      name: `用户 ${params.id}`,
    };
  })
  .post("/upload", async ({ body }) => {
    // 这里不真的保存文件，只演示如何接收请求体。
    return {
      status: "success",
      receivedType: typeof body,
    };
  })
  .listen(3002);

console.log(`Elysia 服务已启动: http://localhost:${app.server?.port}`);
