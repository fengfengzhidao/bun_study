/**
 * 示例 11：Bun Macro 编译时宏
 *
 * 构建：
 *   bun build examples/11-macro/index.ts --outfile dist/macro-demo.js
 *
 * 运行：
 *   bun run dist/macro-demo.js
 *
 * 重点：
 *   getPackageInfo() 会在构建阶段执行，
 *   构建结果里会直接写入返回值，而不是运行时再读取 package.json。
 */

import { getPackageInfo } from "./package-info.ts" with { type: "macro" };

const info = getPackageInfo();

console.log("包名:", info.name);
console.log("版本:", info.version);
console.log("构建时间:", info.builtAt);
