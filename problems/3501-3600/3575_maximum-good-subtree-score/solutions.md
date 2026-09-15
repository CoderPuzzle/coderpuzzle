# Solutions — Maximum Good Subtree Score

## Tree DP over Digit Masks with Subset Convolution

A subset of nodes is good exactly when the digit sets of their values are pairwise disjoint, which turns every value into a 10-bit mask over the digits 0–9. Then dp[u][m] is the maximum sum selectable inside u's subtree whose combined digit mask is exactly m, with an infeasibility sentinel for unreachable masks. A value containing a repeated digit can never be part of a good subset, so such nodes are marked unselectable up front and contribute nothing but still propagate their children's tables upward.

Merging a child into u's table is a max-plus subset convolution: the combined mask c receives the best of a[x] + b[c xor x] over all submasks x of c. This is where the n × 2^10 table stays cheap — enumerating submasks of every c totals 3^10 operations per merge, and there are only n − 1 merges (one per child edge). Selecting u itself overlays vals[u] on every mask that contains u's digit mask, taken from the children's best selection of the complementary digits.

maxScore[u] is simply the maximum over all masks of dp[u] (the empty subset pins it at ≥ 0 via mask 0), and these maxima are summed modulo 10^9 + 7. The traversal is an explicit-stack preorder processed in reverse as a post-order, so 500 nodes deep poses no issue.

**Complexity:** `O(n · 3^10)` time, `O(n · 2^10)` space.
