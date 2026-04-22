import type { MatchedRoute } from "bun";

/**
 * /about 路由
 * 访问：http://localhost:3001/about
 */
export default function about(_req: Request, _match: MatchedRoute) {
  return Response.json({
    page: "about",
    message: "这个响应来自 pages/about.ts",
  });
}
