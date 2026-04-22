/**
 * 示例 10：编译成单文件可执行程序
 *
 * 构建：
 *   bun build examples/10-compile-binary/index.ts --compile --outfile dist/bun-demo
 *
 * 运行：
 *   ./dist/bun-demo fengfeng
 *
 * Windows 下输出文件可能是 dist/bun-demo.exe。
 */

const name = Bun.argv[2] ?? "guest";

console.log(`你好，${name}!`);
console.log("这是一个可以被 bun build --compile 打包的 CLI 示例。");
console.log("当前运行时间:", new Date().toLocaleString());
