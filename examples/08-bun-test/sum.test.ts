/**
 * 示例 08：Bun 内置测试框架
 *
 * 运行：
 *   bun test examples/08-bun-test
 *
 * Bun 的测试 API 兼容 Jest 风格：test、describe、expect。
 */

import { describe, expect, test } from "bun:test";
import { isEven, sum } from "./sum";

describe("sum", () => {
  test("两个正数相加", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("支持负数", () => {
    expect(sum(-1, 2)).toBe(1);
  });
});

describe("isEven", () => {
  test("判断偶数", () => {
    expect(isEven(10)).toBe(true);
  });

  test("判断奇数", () => {
    expect(isEven(9)).toBe(false);
  });
});
