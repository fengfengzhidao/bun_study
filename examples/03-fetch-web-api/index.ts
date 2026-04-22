/**
 * 示例 03：服务端原生 Web API
 *
 * 运行：
 *   bun run examples/03-fetch-web-api/index.ts
 *
 * Bun 原生支持 fetch、Request、Response 等 Web API。
 * 这让前端和后端可以复用同一套网络请求思维模型。
 */

const url = "https://api.github.com/repos/oven-sh/bun";

const response = await fetch(url, {
  headers: {
    // GitHub API 建议带上 User-Agent。
    "User-Agent": "bun-study-demo",
  },
});

if (!response.ok) {
  throw new Error(`请求失败: ${response.status} ${response.statusText}`);
}

const repo = await response.json();

console.log("仓库名称:", repo.full_name);
console.log("Star 数:", repo.stargazers_count);
console.log("主要语言:", repo.language);

export {};
