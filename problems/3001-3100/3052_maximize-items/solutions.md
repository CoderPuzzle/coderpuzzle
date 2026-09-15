# Solutions — Maximize Items

## Whole-warehouse combinations per type

The stocking rule moves one type at a time, and within a type every item
travels together: one "combination" is a copy of the whole type, costing
`SUM(square_footage)` and carrying `COUNT(*)` items. The warehouse fits
exactly `FLOOR(500000 / combination_cost)` whole combinations — partial
combinations are not stockable, so the count is truncated, never rounded —
and stocks `rounds × COUNT(*)` items. The prime type goes first; whatever
it leaves (`500000 − rounds × SUM(...)`) becomes the capacity the
non-prime type fills by the same arithmetic.

The query realizes this with two single-row aggregates over `Inventory`,
one filtered to each `item_type`, cross-joined so the output always has
both rows. Absence is folded into zero rather than dropped: an empty side
would otherwise make `SUM` return null and vanish from the result, so
`COALESCE(SUM(...), 0)` pins the footage at 0, and dividing by
`NULLIF(footage, 0)` keeps an empty (or zero-room) side from erroring —
its `CAST` comes back null and a final `COALESCE` lands it on 0, which is
precisely the "output 0 for that category" note. Truncation itself is
`CAST(... AS INTEGER)`, which floors because capacities and costs are
never negative. The non-prime branch reads the prime row's rounds and
footage directly, so the hand-off of leftover space is a single
subtraction rather than a recomputation, and `ORDER BY item_count DESC`
restores the required descending order.

Each aggregate scans its rows once, so the whole query makes two linear
passes over `Inventory`.

**Complexity:** `O(n)` time, `O(1)` extra space.
