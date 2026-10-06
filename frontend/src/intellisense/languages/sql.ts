import type { LanguageTable, Scope } from "../types";
import { fn } from "../types";

/**
 * SQLite keyword/function completion for the SQL problems (SQLite 3.45).
 * Completion only — no member context, no hover, no signature help.
 */

const KEYWORDS = [
  "SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "HAVING", "LIMIT",
  "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL OUTER JOIN",
  "CROSS JOIN", "ON", "AS", "AND", "OR", "NOT", "IN", "NOT IN", "EXISTS",
  "NOT EXISTS", "BETWEEN", "LIKE", "IS NULL", "IS NOT NULL", "DISTINCT",
  "ALL", "ANY", "UNION", "UNION ALL", "INTERSECT", "EXCEPT", "INSERT INTO",
  "VALUES", "UPDATE", "SET", "DELETE FROM", "CREATE TABLE", "CREATE INDEX",
  "DROP TABLE", "ALTER TABLE", "WITH", "RECURSIVE", "CASE", "WHEN", "THEN",
  "ELSE", "END", "NULL", "ASC", "DESC", "COUNT", "SUM", "AVG", "MIN", "MAX",
  "OVER", "PARTITION BY", "ROW_NUMBER", "RANK", "DENSE_RANK", "WINDOW",
  "IFNULL", "NULLIF", "COALESCE", "CAST", "ROUND", "SUBSTR", "TRIM", "UPPER",
  "LOWER", "CONCAT", "GROUP_CONCAT", "strftime", "date", "datetime",
];

const FUNCTIONS = [
  fn("COUNT", "(*) | (expr) -> int", 0, "COUNT(*) counts rows; COUNT(x) skips NULLs."),
  fn("SUM", "(expr)", 1),
  fn("AVG", "(expr)", 1),
  fn("MIN", "(expr)", 1),
  fn("MAX", "(expr)", 1),
  fn("GROUP_CONCAT", "(expr[, sep])", 1),
  fn("IFNULL", "(a, b)", 2, "b when a is NULL."),
  fn("NULLIF", "(a, b)", 2, "NULL when a = b."),
  fn("COALESCE", "(a, b, ...)", 0, "First non-NULL argument."),
  fn("CAST", "(expr AS type)", 0),
  fn("ROUND", "(x[, digits])", 1),
  fn("ABS", "(x)", 1),
  fn("SUBSTR", "(s, start[, len])", 2, "1-based start."),
  fn("TRIM", "(s)", 1),
  fn("UPPER", "(s)", 1),
  fn("LOWER", "(s)", 1),
  fn("LENGTH", "(s)", 1),
  fn("ROW_NUMBER", "() OVER (PARTITION BY ... ORDER BY ...)", 0),
  fn("RANK", "() OVER (...)", 0),
  fn("DENSE_RANK", "() OVER (...)", 0),
];

function scan(_source: string): Scope {
  return { vars: [], fields: {}, selfMethods: [], imports: [] };
}

export const sql: LanguageTable = {
  id: "sql",
  triggerCharacters: [],
  keywords: KEYWORDS,
  typeOf: [],
  types: {},
  globals: FUNCTIONS,
  modules: {},
  scan,
};
