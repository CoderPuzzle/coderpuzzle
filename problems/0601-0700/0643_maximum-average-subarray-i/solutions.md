# Solutions — Maximum Average Subarray I

## Fixed window, maximum sum

Every candidate subarray has exactly `k` elements, so dividing by `k` is
common to all of them and cannot change which window wins: maximizing the
average is maximizing the sum. That reframing turns the problem into a fixed
window scan — sum the first `k` elements once, then slide the window one
position at a time, adding the element that enters and subtracting the one
that leaves, keeping the largest sum seen. Each slide is one addition and one
subtraction instead of a fresh `k`-element sum.

The running sum stays an exact integer throughout — up to `10⁵` elements of
magnitude `10⁴` put window sums near `10⁹`, which is edge-of-`i32` territory,
so the accumulator is a 64-bit integer (a plain Python `int`, a JavaScript
`number` below `2⁵³`). Precision is decided at a single point: the one
division `max_sum / k` at the end. Both operands are exactly representable
doubles, so IEEE arithmetic rounds that division identically in every
language, and the answer is the same full-precision double everywhere —
comfortably inside the statement's `10⁻⁵` tolerance, and exact on this
judge, which compares that double.

On the first example with `k = 4` the window sums walk `2`, `51`, `42`, so
the answer is the single division `51 / 4 = 12.75`. The edges need no special
cases: `k = 1` degenerates to the maximum element (the initial sum is the
whole answer), and `k = n` leaves one window (the loop body never runs).

**Complexity:** `O(n)` time, `O(1)` space.
