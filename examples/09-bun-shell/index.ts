/**
 * 示例 09：Bun Shell
 *
 * 运行：
 *   bun run examples/09-bun-shell/index.ts
 *
 * Bun 的 $ 可以用模板字符串执行 shell 命令。
 * 它比直接拼接命令字符串更安全，也更适合写跨平台脚本。
 */

import { $ } from "bun";

const outputDir = "examples/09-bun-shell/tmp";

// mkdir -p 会创建目录；目录已存在时不会报错。
await $`mkdir -p ${outputDir}`;

// 通过 shell 写入一段文本，演示命令执行。
await $`echo "Hello from Bun Shell" > ${outputDir}/hello.txt`;

// .text() 可以拿到命令输出。
const files = await $`ls ${outputDir}`.text();

console.log("目录里的文件:");
console.log(files.trim());

export {};
