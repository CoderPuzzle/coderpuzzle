# Solutions — Find the Maximum Sequence Value of Array

## Prefix and Suffix OR-Sets with a Subset-Bounded DP

A subsequence of size `2k` splits into a first half and a second half, and only the OR of each half matters for the value. Crucially, the relative order inside each half is irrelevant, and the best strategy is always to take the left half's `k` elements from some prefix `nums[0:i]` and the right half's from the complementary suffix `nums[i:]` — any subsequence of size `2k` admits such a split point `i` (the position of its `k`-th picked element). So the problem reduces to: for every split point, combine the set of ORs reachable with exactly `k` elements on the left with the set reachable on the right, and maximize the XOR across the two sets.

Each side is computed by a bounded-subset knapsack. While scanning left to right, `dp[c]` holds the set of OR values achievable using exactly `c` of the elements seen so far; processing each new element `x` updates the counts from high to low so each element is used at most once, and after each step a snapshot of `dp[k]` is stored as `pre[i+1]`. A mirrored pass from the right builds `suf[i]` for suffixes. Since all values are below `2⁷`, each set has at most 128 entries, keeping the sets tiny and bounded regardless of `n`.

Finally, for each split index `i` from `k` to `n - k`, every pair `(a, b)` with `a` in `pre[i]` and `b` in `suf[i]` yields a candidate value `a XOR b`, and the answer is the maximum over all splits and pairs. Because the two halves are drawn from disjoint index ranges, every candidate is genuinely achievable, and the enumeration over split points covers every possible subsequence.

Edge cases: `n = 2k` leaves exactly one split; values may repeat, which the set representation deduplicates automatically; the answer can be `0` when the two halves force equal ORs. Writing `V ≤ 2⁷` for the size of the OR-value universe, the knapsack passes cost `O(n · k · V)` and the combination step `O(n · V²)`.

**Complexity:** `O(n · k · V + n · V²)` time, `O(n · V)` space.
