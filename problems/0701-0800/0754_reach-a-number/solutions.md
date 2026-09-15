# Solutions — Reach a Number

Reversing every move turns a path to `target` into a path to `-target`, so
only the magnitude of the destination matters; the whole problem lives in how
far a straight run reaches and how cheaply its overshoot can be undone.
Flipping the direction of any single move shifts the landing point by an even
amount, which makes parity — not distance — the only real obstacle.

## Climb triangular sums until the overshoot is even

Walking right every time, after `k` moves you stand on the triangular sum
`T = 1 + 2 + ... + k = k(k+1)/2`. Since `T` strictly grows with `k`, the first
`k` whose `T` reaches `|target|` is the earliest count that can even arrive at
the destination's magnitude — but only after the overshoot `T - |target|` is
repaired. Flipping move `i` from right to left lowers the landing point by
exactly `2i`, so the repairable overshoots are precisely the even ones: the
moves `1..k` have subset sums covering every value up to `T`, which makes any
even gap cancellable at zero extra cost, while no combination of flips ever
changes the total by an odd amount.

When the first `k` that reaches `|target|` leaves an odd overshoot, one or two
more moves fix the parity: advancing to `k+1` grows `T` by `k+1`, and among
two consecutive increments `k+1`, `k+2` exactly one is odd, so the overshoot's
parity must flip within two steps — `target = 5` walks past `T = 6` (gap 1)
and `T = 10` (gap 5) to land even at `T = 15`, answering 5, while
`target = 2` needs the single extra step from `T = 3` to `T = 6`. The loop
therefore starts at `k = 1` and climbs until `T` both reaches `|target|` and
overshoots it by an even amount; it halts after about `√(2|target|)`
iterations, so at the bound `|target| = 10⁹` it still takes well under fifty
thousand steps. That climb carries a running sum just past one billion —
above the parameter's own scale — so the fixed-width solutions accumulate in
64-bit integers, Python's integers are unbounded, and the JavaScript and
TypeScript sums stay exact far below 2⁵³.

**Complexity:** `O(√t)` time, `O(1)` space.
