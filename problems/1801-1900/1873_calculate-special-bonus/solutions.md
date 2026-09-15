# Solutions — Calculate Special Bonus

The bonus rule is a single conditional over two columns, so the whole
task is one projection: compute `salary` or `0` per row with a `CASE`
expression, then order by the key.

## Conditional projection

Select every employee row and emit `CASE WHEN employee_id % 2 = 1 AND
SUBSTR(name, 1, 1) != 'M' THEN salary ELSE 0 END` as the bonus column.
The odd test uses the primary key directly, and comparing the first
character against `'M'` keeps the test exact rather than collation-
dependent (`LIKE` ignores letter case for ASCII in some engines); both
conditions must hold for the full salary to pass through.

Ordering by `employee_id` at the end makes the output deterministic for
the sorted comparison.

**Complexity:** `O(r)` time for `r` rows, `O(1)` additional space.
