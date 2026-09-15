# Solutions — Minimize XOR

## Greedy bit budget over num1's set bits

The answer must carry exactly `popcount(num2)` set bits, and the cost of a
candidate `x` is `x XOR num1`. A bit of `num1` that survives into `x`
contributes 0 to that xor; a bit of `num1` that is dropped contributes
`2^i`. So keeping set bits is always better than dropping them, and when
the budget cannot cover every set bit of `num1`, which bits to keep is
settled by weight: dropping bit 30 costs more than any fifteen lower bits
combined. Keeping the highest set bits first therefore dominates every
alternative.

If bits remain in the budget after all of `num1`'s set bits are taken, the
surplus has to land somewhere, and each newly set bit costs `2^i` against
`x XOR num1` (it flips a zero of `num1` on). Placing them at the lowest
zero positions minimizes the total: the surplus bits are interchangeable,
so their cost is minimized by taking the cheapest positions. Both phases
are single scans — one downward over the 31 value bits of `num1`, one
upward over the same range filling zeros.

The uniqueness clause in the statement is satisfied automatically: this
greedy produces one specific `x`, and no other arrangement ties it (a tie
would require two different subsets with equal xor, impossible since each
bit position's contribution to the xor is decided independently). Values
stay under `10⁹ < 2³⁰`, so everything fits in signed 32-bit throughout;
the loop bounds of 31 cover every reachable bit.

**Complexity:** `O(30)` time — constant — `O(1)` space.
