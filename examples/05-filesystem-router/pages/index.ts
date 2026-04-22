import type { MatchedRoute } from "bun";

/**
 * / 路由
 * 访问：http://localhost:3001
 */
export default function home(_req: Request, _match: MatchedRoute) {
  return new Response("首页：这是 FileSystemRouter 的 index.ts");
}
