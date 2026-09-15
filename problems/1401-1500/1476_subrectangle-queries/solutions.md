# Solutions

The two natural designs trade update cost against query cost. Writing
every cell eagerly makes updates `O(area)` and reads constant; recording
each update and replaying it lazily makes updates constant and reads
`O(updates)`. With at most 500 total operations both fit easily, and the
brute-force write is the simpler contract, so that is the presentation.

## Brute-Force Update

Store the matrix as given. `updateSubrectangle` walks rows `row1..row2`
and, inside each, overwrites columns `col1..col2` with `newValue` — a
double loop over the affected cells. `getValue` is a plain array read.
Nothing else is tracked: the matrix is always the authoritative current
state.

**Complexity:** `updateSubrectangle` runs in `O((row2 - row1 + 1) ·
(col2 - col1 + 1))`; `getValue` is `O(1)`. Space `O(rows · cols)` for the
matrix itself.
