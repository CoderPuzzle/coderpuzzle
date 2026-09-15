# Solutions — Compute the Rank as a Percentage

## Rank and size as window functions over one partitioned pass

Both ingredients of the formula are per-department aggregates of the row
itself, so no join or grouping is needed: `RANK() OVER (PARTITION BY
department_id ORDER BY mark DESC)` numbers each student by descending
mark within their department — equal marks tie on one rank and the next
distinct mark lands after the whole tied block, which is exactly
standard competition ranking — while `COUNT(*) OVER (PARTITION BY
department_id)` carries every row its department's size. The SELECT list
then applies `(rank - 1) * 100 / (size - 1)` per row and rounds it to
two decimals; `100.0` keeps the division in floating point, since the
operands themselves would make it integer.

Because `comparison` is a multiset over three columns, any row order is
accepted; nothing needs an `ORDER BY`. Every testcase has at least two
students per department, so the denominator is never zero.

The single pass over n rows computes both windows from one sort of the
rows by `(department_id, mark DESC)`, and each output row is assembled
in constant time on top of it.

**Complexity:** `O(n log n)` time, `O(n)` space.
