# Solutions — The Number of Rich Customers

## Count distinct customers after filtering bills

Filter `Store` to bills whose amount is strictly greater than `500`, then count the distinct `customer_id` values that remain. Filtering first enforces the threshold, while `DISTINCT` ensures that a customer with several qualifying bills contributes only once. The aggregate always returns one row, including `0` for an empty table or when no bill qualifies.

The table is scanned once, and the distinct customer identifiers may be held in a set by the database engine. With `N` bills and `C` qualifying customers, the auxiliary state is bounded by `C`.

**Complexity:** `O(N)` expected time and `O(C)` space.
