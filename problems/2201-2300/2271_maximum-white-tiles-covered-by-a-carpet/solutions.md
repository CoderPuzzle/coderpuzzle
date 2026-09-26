# Solutions — Maximum White Tiles Covered by a Carpet

## Sort + sliding window over tiles

An optimal carpet placement can always be shifted left until its left edge
meets the start of the first white tile it covers — shifting never loses a
covered tile, because no white tile lies between that start and the old
left edge. So it suffices to try placing the carpet's left edge at each
tile's `li`. After sorting the (possibly unsorted) tiles by start, a carpet
starting at `tiles[i][0]` reaches position `li + carpetLen - 1`, and every
tile whose `li` is at or before that reach is at least partially covered.

A prefix array of interval lengths (`ri - li + 1`) answers "how many white
tiles lie in the intervals `[i, j)`" in constant time, and a two-pointer
`j` tracks the first tile whose start lies beyond the reach. Because the
reach only grows as `i` grows, `j` advances monotonically, so the whole scan
is linear after the sort. For the window `[i, j)` the full interval lengths
sum to `prefix[j] - prefix[i]`; if the last tile `j - 1` extends past the
reach, the overshoot is subtracted to leave exactly the covered portion.

![On tiles = [[1, 5], [10, 11], [12, 18], [20, 25], [30, 32]] with carpetLen = 10 the carpet anchored at tile 10 reaches 19 and covers [10, 11] and [12, 18] whole, 2 + 7 = 9 white tiles, beating the 6 from anchor 1.](figures/solution-sliding-window-tiles.svg)

Non-overlapping tiles inside `[1, 10⁹]` contain at most `10⁹` white tiles in
total, so every prefix sum and the answer fit comfortably in 32 bits; only
the reach `li + carpetLen - 1` can approach `2 × 10⁹`, just under the 32-bit
ceiling, so the implementations compute it (and `covered`) in a 64-bit type
where it is convenient. JavaScript's `Number` represents all of these
integers exactly.

**Complexity:** `O(n log n)` time (the sort), `O(n)` space (the prefix
array).
