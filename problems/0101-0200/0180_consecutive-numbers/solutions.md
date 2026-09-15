# Solutions — Consecutive Numbers

## Three-alias self-join over consecutive ids

A number qualifies exactly when some three rows at consecutive ids all carry it. Three aliases of the one table line such a triple up: `FROM Logs l1, Logs l2, Logs l3 WHERE l1.id = l2.id - 1 AND l2.id = l3.id - 1` pins l1, l2, l3 onto ids k, k + 1, k + 2 — `id` is unique, so each l1 row matches at most one l2 row and that pair at most one l3 row — and `AND l1.num = l2.num AND l2.num = l3.num` demands the same num across the whole window, the two adjacent equalities chaining transitively to fix all three values.

DISTINCT carries the "all numbers" contract. A run of length four or more contains several overlapping triples (a run of k rows contributes k - 2 of them), and a number that qualifies in several separate runs matches once per triple; without DISTINCT the same num would be reported once per window, while with it each qualifying number comes back as a single row of the single `ConsecutiveNums` column.

The aliases evaluate as nested loops: every row of l1 probes l2 for the id successor, and every surviving pair probes l3 — O(n^2) row comparisons over n rows with no index on `id`, the id arithmetic admitting at most one match per probe — while DISTINCT holds at most one output row per distinct qualifying num.

**Complexity:** `O(n^2)` time, `O(n)` space.
