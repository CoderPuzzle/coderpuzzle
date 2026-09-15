# Solutions — Duplicate Emails

## Group and count

The request is a property of each address as a whole — how many rows carry it — not of any single row. `GROUP BY email` collapses `Person` into one group per distinct address, `COUNT(email)` sizes each group, and `HAVING COUNT(email) > 1` keeps exactly the groups with repeats. Each duplicated email therefore survives as one output row, unique addresses drop out, and an empty table forms no groups at all — zero rows, no special case. `SELECT email AS Email` shapes the one column the contract names.

The filter must be `HAVING`, not `WHERE`: the count describes the whole group, and `WHERE` runs before grouping ever happens. The equivalent self-join states the same test row-wise — `SELECT DISTINCT p1.email FROM Person p1 JOIN Person p2 ON p1.email = p2.email AND p1.id <> p2.id` pairs each row with a different row of the same address, and `DISTINCT` collapses the pairs back to one row per address — but it materializes every matching pair first, where the grouped form reaches that shape directly.

`GROUP BY email` hashes the addresses in a single aggregation pass; with `P` rows in `Person` and `D` distinct emails, only the `D` groups and their counts are held.

**Complexity:** `O(P)` time, `O(D)` space.
