# Solutions — Maximize Subarrays After Removing One Conflicting Pair

## Two Smallest Constraints with Removal Gain Accumulation

For a fixed set of pairs, count valid subarrays by their left endpoint: the subarray starting at `a` stays valid up to just before the earliest right endpoint it is forbidden to touch, so if `b1(a)` is the minimum larger element among pairs whose smaller element is at least `a`, the count is `b1(a) - a` and the total is their sum. Sweep `a` from `n` down to `1`, bucketing each pair `(min, max)` at its smaller element; maintain `b1`, `b2` — the smallest and second smallest right endpoints among active pairs — updating them with each newly activated `b`.

Removing one pair can only help at positions `a` where that pair alone supplies the tight constraint `b1`: after removal the bound relaxes to `b2`, gaining `b2 - b1` subarrays at that `a`. The code accumulates `cnt[b1] += b2 - b1` and tracks the maximum bucket. Keying the gain by the value `b1` is sound because of how ties behave: if two pairs share the same larger endpoint `b`, then once both are active the update path puts the duplicate into the `b2` slot (`b == b1` fails `b < b1`, then `b < b2` sets `b2 = b`), so the gain there is 0 and removing either pair recovers nothing — the true gain of removing the pair that is uniquely tight at each `a` is exactly what lands in its bucket.

The final answer is `sum(b1 - a over all a) + max(cnt)`: the base count under all pairs, plus the best single removal's total gain. If no pair is ever the unique tightest constraint, every bucket is 0 and removing any pair changes nothing, which is correct since exactly one pair must still be removed.

Edge cases: pairs given in either order (normalized so `a < b`), duplicate right endpoints neutralized by the `b1`/`b2` tie handling, and multiple pairs constraining the same start (only the tightest matters for counting, the second tightest for the gain).

**Complexity:** `O(n + p)` time, `O(n)` space, where `p` is the number of conflicting pairs.
