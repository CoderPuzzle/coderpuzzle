# Solutions — Change Null Values in a Table to the Previous Value

## Correlated lookup of the nearest earlier non-null

Each row either already has a drink or must inherit one, so the query can
be read as a per-row question: among rows with a smaller `id` and a
non-null `drink`, take the drink of the greatest such `id`. A correlated
subquery answers it directly — filter to `id` strictly less than the
current row's with `drink IS NOT NULL`, order descending by `id`, keep the
first hit. `COALESCE` then prefers the row's own drink whenever it is
already set, leaving non-null rows untouched.

The outer query emits every row ordered by ascending `id`, which is the
required output order.

**Complexity:** `O(n²)` time in the worst case (SQLite evaluates the
subquery per row), `O(n)` space.
