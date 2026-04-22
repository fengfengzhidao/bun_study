/**
 * 示例 02：文件读取与写入
 *
 * 运行：
 *   bun run examples/02-file-api/index.ts
 *
 * 知识点：
 *   - Bun.file() 返回 BunFile 对象，它是懒加载的
 *   - file.text() 才会真正读取文本内容
 *   - Bun.write() 可以用很少的代码写文件
 */

const inputPath = "examples/02-file-api/input.txt";
const outputPath = "examples/02-file-api/output.txt";

// 这里只是创建文件对象，并没有马上把文件读进内存。
const file = Bun.file(inputPath);

// exists() 可以判断文件是否存在。
if (!(await file.exists())) {
  throw new Error(`文件不存在: ${inputPath}`);
}

// text() 会异步读取文本内容。
const text = await file.text();
console.log("读取到的文件内容:");
console.log(text);

// Bun.write() 可以直接写入字符串、Blob、Response 等内容。
await Bun.write(outputPath, `复制并追加一行:\n${text}\n写入时间: ${new Date().toISOString()}\n`);

console.log(`已写入新文件: ${outputPath}`);

// 让 TypeScript 编辑器把当前文件识别为 ESM，避免顶层 await 报红。
export {};
