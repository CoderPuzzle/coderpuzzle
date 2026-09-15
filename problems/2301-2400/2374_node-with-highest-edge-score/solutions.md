# Solutions — Node With Highest Edge Score

## Accumulate scores in place, then scan

The definition inverts neatly into an array operation: node `edges[i]`
receives `i` as a contribution, so walking `i` from `0` to `n - 1` and
adding `i` into bucket `edges[i]` computes every edge score in one linear
pass — no adjacency lists, no per-node iteration over incomers.

Picking the winner is a second scan that keeps the running best with a
strict comparison: because indices are visited in ascending order and only
a strictly larger score replaces the champion, the first (smallest) index
of any tie is retained automatically.

One overflow note, which the hints call out: a score can reach
`1 + 2 + ... + (10⁵ - 1) ≈ 5 × 10⁹`, beyond 32-bit signed range, so
fixed-width languages accumulate in 64-bit integers. The returned _node
label_ still fits comfortably in 32 bits.

**Complexity:** `O(n)` time, `O(n)` space.
