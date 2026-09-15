# Solutions — Minimum Moves to Make Array Complementary

## Difference Array over Pair Sums

Only the `n/2` mirror pairs matter, and the common target sum `t` they must all reach lies between `2` and `2·limit`. For a fixed `t`, a pair `(a, b)` with `lo = min(a, b)` and `hi = max(a, b)` costs: 0 moves if `t == a + b`; 1 move if `t` lies in `[lo + 1, hi + limit]` (changing one element reaches any such sum); and 2 moves otherwise. Rather than re-adding these costs for every candidate `t`, encode each pair as range updates on a difference array indexed by `t` and sweep once.

Each pair contributes a base of 2 everywhere (`diff[2] += 2`), a −1 across the one-move interval `[lo + 1, hi + limit]`, and a further −1 exactly at `t = a + b` (canceling back at `a + b + 1`): `diff[lo + 1] -= 1`, `diff[a + b] -= 1`, `diff[a + b + 1] += 1`, `diff[hi + limit + 1] += 1`. Prefix-summing the array while sweeping `t` from 2 to `2·limit` yields the total move count for that target in constant amortized time per candidate; the answer is the minimum sweep value.

The interval logic is worth a sanity check: raising the smaller element can reach sums up to `lo + limit`, lowering the larger can reach down to `hi + 1`, so their union `[lo + 1, hi + limit]` is precisely the one-change region, and the pair's own sum sits inside it as the zero-cost point. The difference array is sized `2·limit + 2` so the writes at the upper boundary stay in range.

**Complexity:** `O(n + limit)` time, `O(limit)` space.
