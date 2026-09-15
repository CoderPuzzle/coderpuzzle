# Solutions — Maximum Population Year

The population changes only at year boundaries: each person adds one
alive at `birth` and removes one at `death` (dying in `y` means the
`-1` lands exactly on `y`, so `y` itself is not counted). Reconstructing
the yearly counts from those boundary deltas is the whole problem, and
scanning years in ascending order makes "earliest with the maximum" fall
out of a strict-improvement comparison.

## Year difference array with a prefix sweep

Mark `+1` at every birth year and `-1` at every death year in an array
indexed by year. Sweep from 1950 through 2050 accumulating the running
sum — that sum is the live population of the current year — and keep the
first year achieving the strict maximum. Because ties never replace the
recorded year, the earliest maximal year survives automatically.

One linear pass over the 101 candidate years after constant work per
person.

**Complexity:** `O(n + Y)` time (`Y = 101` year slots), `O(Y)` space.
