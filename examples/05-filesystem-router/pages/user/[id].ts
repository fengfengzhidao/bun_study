import type { MatchedRoute } from "bun";

/**
 * /user/:id 动态路由
 * 访问：http://localhost:3001/user/42
 */
export default function user(_req: Request, match: MatchedRoute) {
  const id = match.params.id;

  return Response.json({
    page: "user detail",
    id,
    message: `你正在查看用户 ${id}`,
  });
}
