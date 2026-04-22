/**
 * 示例 04：Bun.serve HTTP 服务
 *
 * 运行：
 *   bun run examples/04-bun-serve/index.ts
 *
 * 然后打开：
 *   http://localhost:3000
 *   http://localhost:3000/json
 *   http://localhost:3000/hello?name=fengfeng
 *
 * 热重载运行：
 *   bun --hot examples/04-bun-serve/index.ts
 */

const server = Bun.serve({
  port: 3000,
  hostname: "localhost",

  // maxRequestBodySize 可以限制上传体积，防止请求体过大。
  maxRequestBodySize: 1024 * 1024 * 10,

  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/") {
      return new Response("Welcome to Bun.serve!");
    }

    if (url.pathname === "/json") {
      return Response.json({
        runtime: "Bun",
        feature: "Bun.serve",
        now: new Date().toISOString(),
      });
    }

    if (url.pathname === "/hello") {
      const name = url.searchParams.get("name") ?? "guest";
      return new Response(`你好，${name}!`);
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Bun.serve 已启动: http://${server.hostname}:${server.port}`);
