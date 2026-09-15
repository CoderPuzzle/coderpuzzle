# Solutions — Maximize Subarray Sum After Removing All Occurrences of One Element

## Single-Pass Prefix DP with Per-Value Deletion Accounts

Deleting a positive value can only shrink every subarray sum, so only negative values need be considered as the removal candidate `x`. A subarray of the `x`-deleted array spans some original range `(j, r]` with all `x`'s inside removed, and its sum is `P(r) - P(j)` plus `|x|` for each deleted occurrence — i.e. `P(r)` minus an _adjusted prefix_ `P(j) - Σ|deleted occurrences after j|`. This suggests one global Kadane-style sweep: keep, for every candidate `x`, the smallest adjusted prefix seen so far, and at each position try `P(r)` minus the overall minimum across all candidates (plus the plain no-deletion minimum prefix, which covers doing nothing).

The bookkeeping per candidate is O(1) amortized. A hash map keyed by `x` (with key `0` reserved for the no-deletion minimum of `P`) starts an account at the first occurrence of `x` by anchoring at the best plain prefix and subtracting `|x|`; at each later occurrence the account takes `min(its current value, best plain prefix)` and subtracts `|x|` again — re-anchoring lets the deletion window start at this occurrence with a fresh, possibly smaller anchor. Because the candidate check for position `r` runs before the current element is folded into any account, every anchor precedes the subarray's end, so subarrays are never empty.

Each candidate value produced this way is bounded above by the sum of some genuinely achievable subarray of an `x`-deleted array (any occurrences not yet subtracted only make the candidate smaller, never larger), while every achievable deleted-subarray sum is produced when its last element is processed — so the sweep's maximum is exactly the optimum. Keeping the current element in `P(r)` also guarantees the resulting array is non-empty, respecting the operation's constraint.

Edge cases: a single-element array returns its value directly (deleting it is forbidden and pointless); arrays with no negatives reduce to ordinary Kadane through the key-`0` account; the result is seeded with `nums[0]` so all-negative inputs work without a zero sentinel.

**Complexity:** `O(n)` time, `O(n)` space.
