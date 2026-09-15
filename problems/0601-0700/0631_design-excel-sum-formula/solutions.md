# Solutions — Design Excel Sum Formula

## Cell values plus per-cell formula lists, resolved on demand

The sheet is two plain grids of the same shape: `values` holds each cell's
literal, and `formulas` holds, per cell, the flattened list of coordinates its
sum formula names — empty when the cell carries no formula. `sum` builds that
list once, at install time: each entry of `numbers` is parsed into either a
single coordinate (a column letter plus the row number that follows it) or the
row-major sweep of a `"ColRow1:ColRow2"` rectangle, and all the coordinates are
appended into one flat list. References to the same cell are kept as separate
entries, so the example's `["A1", "A1:B2"]` genuinely counts `A1` twice.

`set` writes the literal into `values` and empties the cell's formula list —
that emptying is the entire overlap rule, since a fresh `sum` overwrites the
same list the same way. Nothing is ever propagated at write time. `get` resolves
a cell on demand: a cell with an empty list answers straight from `values`,
while a formula cell adds up its references' own resolved values, recursing.
Because resolution is lazy, a later `set` on a source cell is simply picked up
by the next `get` of anything downstream — the example's final `get(3, "C")`
returning `6`, not the `4` the `sum` call saw, is exactly this.

The recursion always terminates because the sheet is guaranteed free of
circular references: following references from any cell walks strictly down a
dependency chain and bottoms out at literal cells. A cell named k times in one
list is resolved k times, and a deep chain of formulas resolves its whole
closure on every `get`, so the cost is the recompute, not bookkeeping.

**Complexity:** `O(1)` per `set`; `O(R)` per `sum`, flattening its `R`
referenced cells; `O(C)` per `get`, recomputing the `C` cells in the resolved
chain's closure; `O(height x width + R)` space.
