# Solutions — Count Apples and Oranges

One join-and-sum answers the question: walk every box, add its own apples
and oranges, and — when the box holds a chest — add the chest's fruit on
top, so each row of the join carries one box's full contents and a final
pair of sums totals them.

## LEFT JOIN each box onto its chest, sum both counts

`LEFT JOIN Chests c ON b.chest_id = c.chest_id` keeps every box in the
result: a box whose `chest_id` is NULL finds no chest row, and the
unmatched side of a `LEFT JOIN` yields NULLs rather than dropped rows.
That NULL is the query's one trap — NULL added to anything is NULL, so a
bare `SUM(b.apple_count + c.apple_count)` would wipe out every chest-less
box's fruit. `COALESCE(c.apple_count, 0)` restores the absent chest to
zero before the addition. A chest shared by several boxes simply matches
several times, its fruit counting once per box — the example's chest 6
rides along with both box 20 and box 8 — while a chest no box references
never enters the join at all, which is why the example's chest 16
contributes nothing even though it sits in `Chests` with 19 of each.

With one row per box carrying that box's full fruit, the outer
aggregation is a plain pair of `SUM`s over the join. An empty `Boxes`
table leaves those sums with no input, and `SUM` over nothing is NULL
rather than 0, so `COALESCE(SUM(...), 0)` reports the required zero
totals. The result is a single row — there is no ordering to pin down.

**Complexity:** `O(n)` time, `O(1)` extra space (aggregation).
