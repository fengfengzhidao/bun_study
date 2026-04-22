(function () {
  const demos = [
    {
      id: "env",
      title: "01 环境变量",
      language: "typescript",
      command: "bun --env-file=examples/01-env/example.env run examples/01-env/index.ts",
      code: [
        "// examples/01-env/example.env",
        "PORT=3000",
        "API_KEY=fengfeng_666",
        "APP_NAME=bun-env-demo",
        "",
        "// examples/01-env/index.ts",
        "/**",
        " * Bun 默认会读取当前工作目录下的 .env。",
        " * 这个示例用 --env-file 明确指定独立目录里的环境变量文件。",
        " */",
        "",
        "console.log(\"应用名称:\", Bun.env.APP_NAME);",
        "console.log(\"服务端口:\", process.env.PORT);",
        "",
        "// 真实项目不要把密钥打印到日志里；这里仅用于教学。",
        "console.log(\"API_KEY:\", Bun.env.API_KEY);",
        "",
        "if (!Bun.env.PORT) {",
        "  throw new Error(\"没有读取到 PORT，请确认 example.env 文件存在\");",
        "}",
      ].join("\n"),
      output: [
        "$ bun --env-file=examples/01-env/example.env run examples/01-env/index.ts",
        "应用名称: bun-env-demo",
        "服务端口: 3000",
        "API_KEY: fengfeng_666",
      ].join("\n"),
    },
    {
      id: "file",
      title: "02 文件 API",
      language: "typescript",
      command: "bun run examples/02-file-api/index.ts",
      code: [
        "// examples/02-file-api/input.txt",
        "Hello Bun File API!",
        "这是一段用于演示 Bun.file() 的文本。",
        "",
        "// examples/02-file-api/index.ts",
        "const inputPath = \"examples/02-file-api/input.txt\";",
        "const outputPath = \"examples/02-file-api/output.txt\";",
        "",
        "// 这里只是创建文件对象，并没有马上把文件读进内存。",
        "const file = Bun.file(inputPath);",
        "",
        "if (!(await file.exists())) {",
        "  throw new Error(`文件不存在: ${inputPath}`);",
        "}",
        "",
        "// text() 会异步读取文本内容。",
        "const text = await file.text();",
        "console.log(\"读取到的文件内容:\");",
        "console.log(text);",
        "",
        "// Bun.write() 可以直接写入字符串、Blob、Response 等内容。",
        "await Bun.write(outputPath, `复制并追加一行:\\n${text}\\n写入时间: ${new Date().toISOString()}\\n`);",
        "",
        "console.log(`已写入新文件: ${outputPath}`);",
        "export {};",
      ].join("\n"),
      output: [
        "$ bun run examples/02-file-api/index.ts",
        "读取到的文件内容:",
        "Hello Bun File API!",
        "这是一段用于演示 Bun.file() 的文本。",
        "",
        "已写入新文件: examples/02-file-api/output.txt",
      ].join("\n"),
    },
    {
      id: "fetch",
      title: "03 原生 fetch",
      language: "typescript",
      command: "bun run examples/03-fetch-web-api/index.ts",
      code: [
        "const url = \"https://api.github.com/repos/oven-sh/bun\";",
        "",
        "const response = await fetch(url, {",
        "  headers: {",
        "    // GitHub API 建议带上 User-Agent。",
        "    \"User-Agent\": \"bun-study-demo\",",
        "  },",
        "});",
        "",
        "if (!response.ok) {",
        "  throw new Error(`请求失败: ${response.status} ${response.statusText}`);",
        "}",
        "",
        "const repo = await response.json();",
        "",
        "console.log(\"仓库名称:\", repo.full_name);",
        "console.log(\"Star 数:\", repo.stargazers_count);",
        "console.log(\"主要语言:\", repo.language);",
        "",
        "export {};",
      ].join("\n"),
      output: [
        "$ bun run examples/03-fetch-web-api/index.ts",
        "仓库名称: oven-sh/bun",
        "Star 数: 89259",
        "主要语言: Zig",
      ].join("\n"),
    },
    {
      id: "serve",
      title: "04 Bun.serve",
      language: "typescript",
      command: "bun run examples/04-bun-serve/index.ts",
      code: [
        "const server = Bun.serve({",
        "  port: 3000,",
        "  hostname: \"localhost\",",
        "",
        "  // 限制上传体积，防止请求体过大。",
        "  maxRequestBodySize: 1024 * 1024 * 10,",
        "",
        "  fetch(req) {",
        "    const url = new URL(req.url);",
        "",
        "    if (url.pathname === \"/\") {",
        "      return new Response(\"Welcome to Bun.serve!\");",
        "    }",
        "",
        "    if (url.pathname === \"/json\") {",
        "      return Response.json({",
        "        runtime: \"Bun\",",
        "        feature: \"Bun.serve\",",
        "        now: new Date().toISOString(),",
        "      });",
        "    }",
        "",
        "    if (url.pathname === \"/hello\") {",
        "      const name = url.searchParams.get(\"name\") ?? \"guest\";",
        "      return new Response(`你好，${name}!`);",
        "    }",
        "",
        "    return new Response(\"Not Found\", { status: 404 });",
        "  },",
        "});",
        "",
        "console.log(`Bun.serve 已启动: http://${server.hostname}:${server.port}`);",
      ].join("\n"),
      output: [
        "$ bun run examples/04-bun-serve/index.ts",
        "Bun.serve 已启动: http://localhost:3000",
        "",
        "GET /json",
        "{\"runtime\":\"Bun\",\"feature\":\"Bun.serve\",\"now\":\"2026-04-22T10:00:00.000Z\"}",
        "",
        "GET /hello?name=fengfeng",
        "你好，fengfeng!",
      ].join("\n"),
    },
    {
      id: "router",
      title: "05 文件路由",
      language: "typescript",
      command: "bun run examples/05-filesystem-router/index.ts",
      code: [
        "// examples/05-filesystem-router/index.ts",
        "const router = new Bun.FileSystemRouter({",
        "  style: \"nextjs\",",
        "  dir: \"examples/05-filesystem-router/pages\",",
        "});",
        "",
        "const server = Bun.serve({",
        "  port: 3001,",
        "  hostname: \"localhost\",",
        "  async fetch(req) {",
        "    const match = router.match(req);",
        "",
        "    if (!match) {",
        "      return new Response(\"File route not found\", { status: 404 });",
        "    }",
        "",
        "    const page = await import(match.filePath);",
        "    return page.default(req, match);",
        "  },",
        "});",
        "",
        "console.log(`文件路由服务已启动: http://${server.hostname}:${server.port}`);",
        "",
        "// pages/user/[id].ts",
        "export default function user(_req, match) {",
        "  const id = match.params.id;",
        "  return Response.json({ page: \"user detail\", id, message: `你正在查看用户 ${id}` });",
        "}",
      ].join("\n"),
      output: [
        "$ bun run examples/05-filesystem-router/index.ts",
        "文件路由服务已启动: http://localhost:3001",
        "",
        "GET /about",
        "{\"page\":\"about\",\"message\":\"这个响应来自 pages/about.ts\"}",
        "",
        "GET /user/42",
        "{\"page\":\"user detail\",\"id\":\"42\",\"message\":\"你正在查看用户 42\"}",
      ].join("\n"),
    },
    {
      id: "elysia",
      title: "06 Elysia API",
      language: "typescript",
      command: "bun run examples/06-elysia-api/index.ts",
      code: [
        "import { Elysia } from \"elysia\";",
        "",
        "const app = new Elysia()",
        "  .get(\"/\", () => \"首页：Hello Elysia\")",
        "  .get(\"/user/:id\", ({ params }) => {",
        "    return {",
        "      id: params.id,",
        "      name: `用户 ${params.id}`,",
        "    };",
        "  })",
        "  .post(\"/upload\", async ({ body }) => {",
        "    // 这里不真的保存文件，只演示如何接收请求体。",
        "    return {",
        "      status: \"success\",",
        "      receivedType: typeof body,",
        "    };",
        "  })",
        "  .listen(3002);",
        "",
        "console.log(`Elysia 服务已启动: http://localhost:${app.server?.port}`);",
      ].join("\n"),
      output: [
        "$ bun run examples/06-elysia-api/index.ts",
        "Elysia 服务已启动: http://localhost:3002",
        "",
        "GET /user/100",
        "{\"id\":\"100\",\"name\":\"用户 100\"}",
      ].join("\n"),
    },
    {
      id: "sqlite",
      title: "07 SQLite",
      language: "typescript",
      command: "bun run examples/07-sqlite/index.ts",
      code: [
        "import { Database } from \"bun:sqlite\";",
        "",
        "// :memory: 表示创建内存数据库，程序结束后数据消失。",
        "const db = new Database(\":memory:\");",
        "",
        "db.run(`",
        "  CREATE TABLE users (",
        "    id INTEGER PRIMARY KEY AUTOINCREMENT,",
        "    name TEXT NOT NULL,",
        "    age INTEGER NOT NULL",
        "  )",
        "`);",
        "",
        "const insertUser = db.prepare(\"INSERT INTO users (name, age) VALUES (?, ?)\");",
        "insertUser.run(\"fengfeng\", 18);",
        "insertUser.run(\"bun learner\", 20);",
        "",
        "const users = db.query(\"SELECT id, name, age FROM users ORDER BY id\").all();",
        "",
        "console.log(\"查询到的用户:\");",
        "console.table(users);",
        "",
        "db.close();",
      ].join("\n"),
      output: [
        "$ bun run examples/07-sqlite/index.ts",
        "查询到的用户:",
        "┌───┬────┬─────────────┬─────┐",
        "│   │ id │ name        │ age │",
        "├───┼────┼─────────────┼─────┤",
        "│ 0 │ 1  │ fengfeng    │ 18  │",
        "│ 1 │ 2  │ bun learner │ 20  │",
        "└───┴────┴─────────────┴─────┘",
      ].join("\n"),
    },
    {
      id: "test",
      title: "08 bun test",
      language: "typescript",
      command: "bun test examples/08-bun-test",
      code: [
        "// sum.ts",
        "export function sum(a: number, b: number) {",
        "  return a + b;",
        "}",
        "",
        "export function isEven(value: number) {",
        "  return value % 2 === 0;",
        "}",
        "",
        "// sum.test.ts",
        "import { describe, expect, test } from \"bun:test\";",
        "import { isEven, sum } from \"./sum\";",
        "",
        "describe(\"sum\", () => {",
        "  test(\"两个正数相加\", () => {",
        "    expect(sum(1, 2)).toBe(3);",
        "  });",
        "});",
        "",
        "describe(\"isEven\", () => {",
        "  test(\"判断偶数\", () => {",
        "    expect(isEven(10)).toBe(true);",
        "  });",
        "});",
      ].join("\n"),
      output: [
        "$ bun test examples/08-bun-test",
        "bun test v1.3.13",
        "",
        "examples\\08-bun-test\\sum.test.ts:",
        "(pass) sum > 两个正数相加",
        "(pass) sum > 支持负数",
        "(pass) isEven > 判断偶数",
        "(pass) isEven > 判断奇数",
        "",
        "4 pass",
        "0 fail",
      ].join("\n"),
    },
    {
      id: "shell",
      title: "09 Bun Shell",
      language: "typescript",
      command: "bun run examples/09-bun-shell/index.ts",
      code: [
        "import { $ } from \"bun\";",
        "",
        "const outputDir = \"examples/09-bun-shell/tmp\";",
        "",
        "// mkdir -p 会创建目录；目录已存在时不会报错。",
        "await $`mkdir -p ${outputDir}`;",
        "",
        "// 通过 shell 写入一段文本，演示命令执行。",
        "await $`echo \"Hello from Bun Shell\" > ${outputDir}/hello.txt`;",
        "",
        "// .text() 可以拿到命令输出。",
        "const files = await $`ls ${outputDir}`.text();",
        "",
        "console.log(\"目录里的文件:\");",
        "console.log(files.trim());",
        "",
        "export {};",
      ].join("\n"),
      output: [
        "$ bun run examples/09-bun-shell/index.ts",
        "目录里的文件:",
        "hello.txt",
      ].join("\n"),
    },
    {
      id: "compile",
      title: "10 单文件打包",
      language: "typescript",
      command: "bun build examples/10-compile-binary/index.ts --compile --outfile dist/bun-demo",
      code: [
        "const name = Bun.argv[2] ?? \"guest\";",
        "",
        "console.log(`你好，${name}!`);",
        "console.log(\"这是一个可以被 bun build --compile 打包的 CLI 示例。\");",
        "console.log(\"当前运行时间:\", new Date().toLocaleString());",
      ].join("\n"),
      output: [
        "$ bun build examples/10-compile-binary/index.ts --compile --outfile dist/bun-demo",
        "Bundled 1 module",
        "Compiled dist/bun-demo",
        "",
        "$ ./dist/bun-demo fengfeng",
        "你好，fengfeng!",
        "这是一个可以被 bun build --compile 打包的 CLI 示例。",
        "当前运行时间: 2026/4/22 18:30:00",
      ].join("\n"),
    },
    {
      id: "macro",
      title: "11 编译时宏",
      language: "typescript",
      command: "bun build examples/11-macro/index.ts --outfile dist/macro-demo.js",
      code: [
        "// package-info.ts",
        "import packageJson from \"../../package.json\" with { type: \"json\" };",
        "",
        "export function getPackageInfo() {",
        "  return {",
        "    name: packageJson.name,",
        "    version: packageJson.version,",
        "    builtAt: new Date().toISOString(),",
        "  };",
        "}",
        "",
        "// index.ts",
        "import { getPackageInfo } from \"./package-info.ts\" with { type: \"macro\" };",
        "",
        "const info = getPackageInfo();",
        "",
        "console.log(\"包名:\", info.name);",
        "console.log(\"版本:\", info.version);",
        "console.log(\"构建时间:\", info.builtAt);",
      ].join("\n"),
      output: [
        "$ bun build examples/11-macro/index.ts --outfile dist/macro-demo.js",
        "Bundled 1 module",
        "",
        "$ bun run dist/macro-demo.js",
        "包名: bun_study",
        "版本: 1.0.1",
        "构建时间: 2026-04-22T10:30:00.000Z",
      ].join("\n"),
    },
  ];

  const playground = document.querySelector("[data-bun-playground]");
  if (!playground) return;

  const listEl = playground.querySelector(".demo-list");
  const titleEl = playground.querySelector(".demo-title");
  const commandEl = playground.querySelector(".demo-command");
  const codeEl = playground.querySelector(".demo-code code");
  const terminalEl = playground.querySelector(".demo-terminal code");
  const slideEl = playground.closest(".slide");
  let activeIndex = 0;
  let codeTimer = 0;
  let outputTimer = 0;
  let autoPlayed = false;

  function clearTimers() {
    clearInterval(codeTimer);
    clearInterval(outputTimer);
  }

  function highlightCode() {
    codeEl.removeAttribute("data-highlighted");
    codeEl.className = `language-${demos[activeIndex].language}`;
    hljs.highlightElement(codeEl);
  }

  function typeInto(el, text, onDone, speed) {
    let i = 0;
    el.textContent = "";
    const chunk = Math.max(1, Math.ceil(text.length / 320));
    const timer = setInterval(() => {
      i = Math.min(text.length, i + chunk);
      el.textContent = text.slice(0, i);
      el.parentElement.scrollTop = el.parentElement.scrollHeight;
      if (i >= text.length) {
        clearInterval(timer);
        if (onDone) onDone();
      }
    }, speed);
    return timer;
  }

  function renderList() {
    listEl.innerHTML = demos
      .map((demo, index) => {
        const selected = index === activeIndex ? " is-active" : "";
        return `<button type="button" class="demo-tab${selected}" data-index="${index}"><span>${String(index + 1).padStart(2, "0")}</span>${demo.title.replace(/^\d+\s*/, "")}</button>`;
      })
      .join("");
  }

  function selectDemo(index, shouldType) {
    clearTimers();
    activeIndex = index;
    const demo = demos[activeIndex];
    titleEl.textContent = demo.title;
    commandEl.textContent = demo.command;
    terminalEl.textContent = "";
    codeEl.textContent = "";
    renderList();

    if (shouldType) {
      codeTimer = typeInto(codeEl, demo.code, highlightCode, 8);
    } else {
      codeEl.textContent = demo.code;
      highlightCode();
    }
  }

  function runDemo() {
    clearInterval(outputTimer);
    terminalEl.textContent = "";
    outputTimer = typeInto(terminalEl, demos[activeIndex].output, null, 18);
  }

  listEl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-index]");
    if (!button) return;
    selectDemo(Number(button.dataset.index), true);
  });

  playground.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (!action) return;
    if (action === "type") selectDemo(activeIndex, true);
    if (action === "run") runDemo();
    if (action === "reset") selectDemo(activeIndex, false);
  });

  const observer = new MutationObserver(() => {
    if (slideEl.classList.contains("is-active") && !autoPlayed) {
      autoPlayed = true;
      selectDemo(0, true);
    }
  });

  observer.observe(slideEl, { attributes: true, attributeFilter: ["class"] });
  selectDemo(0, false);
})();
