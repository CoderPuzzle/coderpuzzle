# Solutions — Sqrt(x)

## Binary search on the root

The statement asks for the square root rounded down, which is the largest integer `m` with `m * m <= x`. That predicate is monotone — once a candidate's square overshoots `x`, every larger candidate overshoots too — so the answer can be found by binary search over `0..x`. The loop keeps an interval of candidates that could still be the largest satisfying one, probes the midpoint rounded up (a plain floor can leave the interval unable to shrink when the midpoint equals the low end), moves the low end onto a midpoint whose square still fits, and drops everything through the midpoint otherwise. The interval halves each round and closes on the answer, needing at most about 31 probes even at the input ceiling.

The trap is the probe, not the loop. Near `x = 2³¹ - 1` the answer is 46340, but the midpoints themselves start out near `x`, and the largest probe squared reaches about `2⁶²` — far outside 32 bits. C++, Java, Rust, and Go therefore keep the bounds and the midpoint in 64-bit integers and square only after widening; Python integers are unbounded, and JavaScript doubles hold every integer through `2⁵³` exactly. Past `2⁵³` a product only arises when the candidate is already so large that "too big" is the verdict by a margin no rounding can erase, so even the inexact comparisons decide correctly.

Newton's method, the statement's other listed topic, converges from a generous start in a handful of steps, but its integer form needs a careful stopping rule: iterates can oscillate forever between two neighboring values, so implementations end up re-checking `m * m` and decrementing to restore the floor anyway. The halving loop terminates by construction, needs no epsilon, and lands directly on the rounded-down value the statement asks for — which is why it is the one approach shipped here.

**Complexity:** `O(log x)` time, `O(1)` space.
