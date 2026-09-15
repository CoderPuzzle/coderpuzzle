# Solutions — Flipping an Image

## Fold the flip and the invert into one two-pointer sweep

Row `i` of the answer is the input row reversed and then inverted — and the
two steps commute into a single exchange: cell `(i, j)` of the result is
`1 - image[i][n - 1 - j]`. So each row is finished by one two-pointer sweep
that swaps `row[left] ^ 1` with `row[right] ^ 1`: the swap performs the
horizontal flip while the XOR performs the invert, and neither operation
waits for the other. XOR with 1 is exactly the bit replacement the statement
asks for (`0 ^ 1 = 1`, `1 ^ 1 = 0`), and since every entry is guaranteed to
be 0 or 1, no branch or mask is ever needed.

The middle cell of an odd-width row is its own mirror partner, so the
pointers pass over it without exchanging anything; it is inverted once, in
place, after the sweep closes. Everything happens inside the given matrix,
which the method then returns — no second matrix is allocated, and every
cell is read and written a constant number of times.

The task is pure simulation with no structure to exploit, so this fused
sweep is the whole story: every cell of the output must be produced, which
puts a linear-in-cells floor under any correct method, and this one touches
each cell exactly once with nothing beyond two indices of extra state.

**Complexity:** `O(n²)` time, `O(1)` space.
