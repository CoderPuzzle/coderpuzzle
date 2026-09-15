# Solutions — Rename Columns

## Rename in the projection

The task is a pure re-labeling: every row and every value passes through untouched, and only the four column names change. In SQL that lives entirely in the `SELECT` list — each column is projected through an alias, `id AS student_id`, `first AS first_name`, `last AS last_name`, `age AS age_in_years` — and because the judge compares result column names, the aliases are the whole answer.

With no `ORDER BY`, SQLite scans the `students` rowid table in insertion order, which is exactly the seeded row order the expected output keeps; adding no `WHERE` and no expression keeps every row and every value byte-identical to the seed.

**Complexity:** O(n) time over n rows, O(n) space for the streamed result.
