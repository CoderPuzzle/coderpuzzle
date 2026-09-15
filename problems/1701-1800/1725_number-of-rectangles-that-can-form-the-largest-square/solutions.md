# Solutions — Number Of Rectangles That Can Form The Largest Square

Each rectangle answers the cutting question on its own: the biggest square it
can yield has side `min(li, wi)`, so the problem collapses to finding the
largest of those minima and counting how many rectangles attain it.

## One pass, maximum and its count together

Walk `rectangles` once carrying two values: the best side length seen so far
and how many rectangles have produced it. For each rectangle take
`side = min(li, wi)` — a strictly larger `side` raises the running maximum
and resets the count to 1, an equal `side` increments the count, and a
smaller one leaves both untouched. When the walk ends, the count names
exactly the rectangles that can make a square of side `maxLen`.

The reset-on-new-maximum rule is what keeps the pair honest: the count only
ever describes rectangles at the current maximum, never a smaller value some
earlier prefix peaked at, so a rectangle that tied a since-beaten record
correctly stops being counted. The guarantees do the rest of the work —
`li != wi` rules out squares among the inputs, the count is bounded by
`rectangles.length <= 1000`, and the minima fit comfortably below `10⁹`,
so plain 32-bit integers carry every value the loop touches. Each rectangle
is read exactly once and nothing is remembered beyond the two variables.

**Complexity:** `O(n)` time, `O(1)` extra space.
