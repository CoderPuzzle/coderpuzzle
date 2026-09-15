# Solutions — Apply Operations on Array to Maximize Sum of Squares

## Bit-pool redistribution greedy

The operation replaces a pair `(a, b)` with `(a AND b, a OR b)`: the AND
keeps exactly the bits both values shared and the OR keeps exactly the bits
either one had, so the pair still holds the same multiset of set bits —
every operation just moves copies of bits between its two elements. Each
bit position `b` therefore owns a pool of `count[b]` copies across the
array (at most 30 positions, since `nums[i] <= 10⁹ < 2³⁰`), and hint 1's
transfer view makes the reachable arrays precisely the rearrangements that
keep every pool size fixed.

To maximize a sum of squares, pour the pools into the `k` chosen elements
greedily from the highest bit down: adding a set bit `2^b` to a larger
running value `x` raises its square by `2^b(2x + 2^b)`, strictly more than
the same bit added to a smaller value, so an exchange argument always
prefers the currently-largest slots. Slot `i` of the kept block ends up
holding bit `b` exactly when `i` sits below `min(count[b], k)`, which lets
the final values be walked without touching the bits slot by slot: start
from the OR of every present bit, then sweep the slots once and drop bit
`b` as the sweep passes index `count[b]`.

Every kept value stays below `2³⁰`, but its square reaches about
`1.15 × 10¹⁸` — past signed 32-bit, and past JavaScript Number's exact
integer range — so each square is reduced modulo `10⁹ + 7` while the total
accumulates in 64-bit (BigInt on the JavaScript side) arithmetic. Counting
the pools is one pass over `nums`; the sweep then touches each of the `k`
kept slots exactly once.

**Complexity:** `O(30 · n + k)` time, `O(k)` space.
