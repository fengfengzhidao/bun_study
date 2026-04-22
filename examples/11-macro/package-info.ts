import packageJson from "../../package.json" with { type: "json" };

/**
 * 宏函数会在 bun build 阶段执行。
 *
 * 要求：
 *   - 返回值必须可以被序列化
 *   - 不要依赖运行时才存在的数据
 */
export function getPackageInfo() {
  return {
    name: packageJson.name,
    version: packageJson.version,
    builtAt: new Date().toISOString(),
  };
}
