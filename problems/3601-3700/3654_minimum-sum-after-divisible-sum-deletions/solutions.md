# Solutions — Minimum Sum After Divisible Sum Deletions

## Prefix DP over remainder buckets

A subarray sums to a multiple of `k` exactly when the prefix sums at its two
endpoints leave the same remainder mod `k`. Deletions also compose more
tamely than they first appear: however a sequence nests and closes gaps, its
outcome equals deleting a set of pairwise disjoint blocks of the original
array, each with a divisible sum — when an outer deletion sweeps over an
already-deleted interior, its total absorbs that interior, remainder and
all, so the merged outer block is itself a legal deletion on the untouched
array. The task therefore reduces to choosing disjoint divisible-sum blocks
whose removed total is as large as possible, and a single left-to-right
sweep decides it: let `dp[i]` be the minimum surviving sum over the first
`i` elements. Either element `i` survives, giving `dp[i] = dp[i-1] +
nums[i-1]`, or the block ending at `i` is deleted back to the last earlier
prefix `j` with the same prefix remainder, and nothing new survives:
`dp[i] = dp[j]`.

Every step needs only one remainder class, so keep a map from remainder to
the smallest `dp[j]` seen so far among prefixes with that remainder — seeded
with `dp[0] = 0` at prefix sum 0. At each element, take the keep step,
fold in the bucket stored under the running prefix's remainder, and only
then insert the freshly computed `dp[i]` into its bucket. Querying before
inserting matters: it excludes the empty block from `j = i` back to itself,
whose "deletion" would be a no-op. When no deletion is ever legal every
lookup misses, the keep steps alone carry the sweep, and the full array sum
falls out unchanged — the spec's no-deletion outcome needs no special case.

The sums outgrow 32 bits before anything else does: `10⁵` elements of `10⁶`
total up to `10¹¹`, so fixed-width languages accumulate and return through
64-bit integers (`long long`, `long`, `int64_t`, `i64`). JavaScript numbers
stay exact far past that, and Python integers are unbounded. Each element
costs one hash update, so the sweep is linear in `n` while the map never
holds more than `min(n, k) + 1` remainders.

**Complexity:** `O(n)` time, `O(min(n, k))` space.
