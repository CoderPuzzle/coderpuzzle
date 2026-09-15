# Solutions — Evaluate Boolean Expression

## Two joins and a CASE

The `Expressions` row holds variable names, not values, so the first job
is to pull both numbers in: alias `Variables` once as `lv` joined on
`left_operand` and once as `rv` joined on `right_operand`. Both names are
guaranteed present, so inner joins keep exactly one row per expression —
`name` is the table's primary key, so neither join can duplicate.

With `lv.value` and `rv.value` on the same row, the verdict is a three-arm
`CASE` on `operator`: `'>'` compares `lv.value > rv.value`, `'<'` the
reverse, `'='` equality; the arm's result maps to `'true'` or `'false'`.
Every expression row flows through untouched — the output carries the
three input columns plus the verdict — and row order stays free.

**Complexity:** `O(E + V)` for the two joins over the tables, `O(E)`
space for the result.
