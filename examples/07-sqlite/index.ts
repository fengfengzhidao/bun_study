/**
 * 示例 07：Bun 内置 SQLite
 *
 * 运行：
 *   bun run examples/07-sqlite/index.ts
 *
 * Bun 内置 bun:sqlite，不需要安装 better-sqlite3 或 sqlite3。
 */

import { Database } from "bun:sqlite";

// :memory: 表示创建内存数据库，程序结束后数据消失。
const db = new Database(":memory:");

db.run(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
  )
`);

// prepare/query 可以复用 SQL，避免手动拼接字符串。
const insertUser = db.prepare("INSERT INTO users (name, age) VALUES (?, ?)");
insertUser.run("fengfeng", 18);
insertUser.run("bun learner", 20);

const users = db.query("SELECT id, name, age FROM users ORDER BY id").all();

console.log("查询到的用户:");
console.table(users);

db.close();
