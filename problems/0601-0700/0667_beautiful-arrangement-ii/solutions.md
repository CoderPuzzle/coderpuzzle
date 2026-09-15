# Solutions — Beautiful Arrangement II

## Alternating head, ascending tail

The head of the answer uses the values `1..k + 1` only, and spends them by
alternating between the two ends of that range: `1, k + 1, 2, k, 3, k - 1, ...`.
Each hop in that zigzag travels one step less than the hop before it, so the
first `k` adjacent differences are exactly `k, k - 1, ..., 1` — every value
from 1 to `k` appears, each once, which already supplies all `k` distinct
differences the statement demands. Consuming `k + 1` values in `k + 1` slots
by taking from the bottom on even steps and the top on odd steps uses each
value exactly once, so the head is a permutation of its range without any
bookkeeping.

The remaining values `k + 2..n` simply follow in ascending order. The
junction — the step from the head's last value up to `k + 2` — always lands
back inside `1..k` (the head ends near the middle of `1..k + 1`), and every
step after it is a difference of 1, which the head already produced. So the
tail adds no new distinct difference, and the finished list has exactly `k`
of them; it is a permutation of `1..n` because the head and the tail
partition that range.

At `k = 1` the construction degenerates to `1, 2` followed by `3..n` — the
plain ascending list, whose only difference is 1. At `k = n - 1` the tail is
empty and the whole answer is the zigzag.

**Complexity:** `O(n)` time, `O(n)` space — the output itself.
