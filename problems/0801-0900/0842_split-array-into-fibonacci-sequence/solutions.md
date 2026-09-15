# Solutions — Split Array into Fibonacci Sequence

Only the first two pieces of a split are free. Every later term is pinned by
the two before it — it must equal their sum — so a candidate split is
completely described by where its first two cuts fall. Searching all splits
therefore means nesting two loops over cut positions and, under each pair,
following one forced walk down the string: backtracking in its plainest form.

## Cut, cut, then follow the forced run

A piece is at most ten digits long, since anything longer already exceeds the
32-bit bound, so the loops try at most a hundred cut pairs, shortest piece
first. A piece beginning with `0` is legal only as the single digit `0`,
which caps its length at one and lets the loop break out early; a piece
whose value has passed 2³¹ - 1 ends its loop the same way, because longer
pieces of the same prefix only grow.

Under a pair `(a, b)` the rest is forced: compute `z = a + b` in a 64-bit
accumulator, abandon the pair the moment `z` leaves the 32-bit range, and
require the decimal spelling of `z` to sit at the current position — this is
also where leading zeroes die, because the spelling of a positive number
never starts with `0`. Each match advances the position by the width of `z`
and shifts the window to `(b, z)`. A pair that consumes the whole string is
the answer, and the first such pair in the loop order is exactly the
shortest-first split the statement pins; if the loops run out, no split
exists and `[]` goes back.

**Complexity:** `O(n²)` time, `O(n)` space.
