# Solutions — Fruit Into Baskets

A legal picking trip is a contiguous stretch of trees holding at most two
fruit types — two baskets with one type each, one fruit taken from every tree
while moving right, and a halt at the first tree that fits neither basket. The
answer is the longest such stretch, which makes this the classic
at-most-two-distinct sliding window over the row.

## Sliding window over a type count

Grow the window one tree at a time along the right edge, tracking how many
trees of each type it holds. Most steps change nothing: a type already in the
window, or a fresh type while a basket is still free, keeps the window legal.
The only violation is a third distinct type, and the fix is to retire trees
from the left until one of the three types runs out — its count hits zero and
it leaves the map, restoring exactly two. Example 3 walks `[1,2,3,2,2]`: the
window reaches `[1,2,3]`, retires the `1`, and then grows through `[2,3,2,2]`
to length 4.

Each tree enters the window once and leaves at most once, so both edges move
only forward through `n` steps total. The map never holds more than three
entries — the two basket types plus the transient third during a shrink — so
the bookkeeping is constant-size regardless of how many types the orchard
contains, and after every step the window length contests the maximum.

**Complexity:** `O(n)` time, `O(1)` space.
