/**
 * 示例 05：Bun.FileSystemRouter 文件路由
 *
 * 运行：
 *   bun run examples/05-filesystem-router/index.ts
 *
 * 然后打开：
 *   http://localhost:3001
 *   http://localhost:3001/about
 *   http://localhost:3001/user/42
 *
 * pages 目录里的文件会被当成路由文件。
 */

const router = new Bun.FileSystemRouter({
  style: "nextjs",
  dir: "examples/05-filesystem-router/pages",
});

const server = Bun.serve({
  port: 3001,
  hostname: "localhost",
  async fetch(req) {
    const match = router.match(req);

    if (!match) {
      return new Response("File route not found", { status: 404 });
    }

    // match.filePath 是匹配到的页面文件路径。
    // 动态 import 以后，调用该文件默认导出的处理函数。
    const page = await import(match.filePath);
    return page.default(req, match);
  },
});

console.log(`文件路由服务已启动: http://${server.hostname}:${server.port}`);
