/**
 * 示例 01：读取环境变量
 *
 * 运行：
 *   bun --env-file=examples/01-env/example.env run examples/01-env/index.ts
 *
 * Bun 默认会读取当前工作目录下的 .env。
 * 这个示例把 example.env 放在独立目录里，所以用 --env-file 明确指定。
 * 这里演示两种读取方式：
 *   1. Node 兼容写法：process.env
 *   2. Bun 推荐写法：Bun.env
 */

console.log("应用名称:", Bun.env.APP_NAME);
console.log("服务端口:", process.env.PORT);

// 注意：真实项目里不要把密钥直接打印到日志里。
// 这里为了教学，演示 Bun 可以直接读取 .env 中的变量。
console.log("API_KEY:", Bun.env.API_KEY);

if (!Bun.env.PORT) {
  throw new Error("没有读取到 PORT，请确认 example.env 文件存在");
}
