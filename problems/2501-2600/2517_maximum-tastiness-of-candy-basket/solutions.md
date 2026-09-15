# Solutions — Maximum Tastiness of Candy Basket

## Binary Search on Tastiness with Greedy Check

The answer — the largest achievable minimum pairwise price gap — is monotone: if a basket of `k` candies can keep every gap at least `x`, the same basket keeps every gap at least any smaller value. That monotonicity makes the answer binary searchable over `[0, max(price) - min(price)]`, using the upper-mid variant (`mid = (lo + hi + 1) // 2`) since the predicate is "at least x is achievable" and the search maximizes `x`.

The feasibility check is a one-pass greedy over the sorted prices: always take the first candy, then take each subsequent candy whose price exceeds the last _taken_ candy's price by at least `x`. Postponing a selection can only shrink the remaining room for later picks, so this leftmost-greedy maximizes the number of candies chosen with all consecutive gaps at least `x`; a tastiness of `x` is achievable exactly when it selects at least `k` candies. Consecutive gaps in the chosen chain are what matter because in a sorted selection the minimum pairwise difference always occurs between adjacent picks.

Edge cases are handled by the search bounds: identical prices make even `x = 1` infeasible, and the loop converges to `lo = 0` (the `[7,7,7,7]`, `k = 2` case); `k = 2` reduces to the widest gap in the sorted array. Sorting is done once outside the check so each binary-search iteration costs a single linear scan.

**Complexity:** `O(n log n + n log D)` time (where `D = max(price) - min(price)`), `O(n)` space for the sorted copy.
