# Solutions — Sort Integers by The Power Value

## Memoized Collatz replay plus stable sort

Every value in `[lo, hi]` needs its Collatz step count, and neighbouring chains share almost all of their steps, so each power is computed by path replay: walk the chain from the value, pushing each stop onto a path until reaching a value whose power is already memoized, then unwind the path assigning incrementing step counts. The seed entry is `power(1) = 0`, so even the first walk terminates, and later values frequently land on an earlier value's route and cost only a few fresh steps. The walk is a plain loop — no recursion, so no stack limit to respect.

With powers memoized, the answer is a stable sort of `lo..hi` keyed by `(power, value)` — the value tiebreak implements the required ascending order among equal powers — followed by indexing at `k - 1`.

For the guaranteed bounds (`hi <= 1000`) both the memo and the interval stay tiny; every chain reaches 1 and the memo keeps the total step count near-linear in the interval width.

**Complexity:** `O(H log H)` time for the `H = hi - lo + 1` values being ranked, with memoized power lookups; `O(H + hi)` space for the interval and memo.
