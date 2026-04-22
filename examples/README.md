# Bun 示例代码

这些示例按主题拆成独立文件夹，适合配合 `bun-course-ppt` 教学使用。

## 运行方式

在项目根目录运行：

```bash
bun --env-file=examples/01-env/example.env run examples/01-env/index.ts
bun run examples/02-file-api/index.ts
bun run examples/03-fetch-web-api/index.ts
bun run examples/04-bun-serve/index.ts
bun run examples/05-filesystem-router/index.ts
bun run examples/06-elysia-api/index.ts
bun run examples/07-sqlite/index.ts
bun test examples/08-bun-test
bun run examples/09-bun-shell/index.ts
bun build examples/10-compile-binary/index.ts --compile --outfile dist/bun-demo
bun build examples/11-macro/index.ts --outfile dist/macro-demo.js
```

## 示例目录

- `01-env`：通过 `--env-file` 读取示例目录里的 `example.env` 环境变量
- `02-file-api`：使用 `Bun.file()` 和 `Bun.write()`
- `03-fetch-web-api`：服务端原生 `fetch`
- `04-bun-serve`：使用 `Bun.serve` 启动 HTTP 服务
- `05-filesystem-router`：使用 `Bun.FileSystemRouter`
- `06-elysia-api`：使用 Elysia 写 Express 风格 API
- `07-sqlite`：使用 `bun:sqlite`
- `08-bun-test`：使用 `bun test`
- `09-bun-shell`：使用 Bun Shell 的 `$`
- `10-compile-binary`：编译成单文件可执行程序
- `11-macro`：编译时宏示例
