# Solutions — Kth Smallest Amount With Single Denomination Combination

## Binary search on the answer with inclusion-exclusion

The set of makeable amounts is the union of the multiples of each coin, so asking "how many distinct amounts are at most x" is a classic inclusion-exclusion over the 15 coins: for every non-empty subset S of coins, the amounts divisible by every member of S are exactly the multiples of lcm(S), added when |S| is odd and subtracted when even. That count is monotone in x, so the k-th smallest amount is the least x with count(x) >= k, found by a binary search over [1, k * min(coins)] — the k-th multiple of the smallest coin is a safe upper bound.

count_le walks all 2^m subset masks and builds each lcm incrementally with a gcd step, taking floor(x / l) with the sign of the subset parity. The lcm of up to 15 coins can overflow any useful range very quickly, so the inner loop breaks as soon as the partial lcm exceeds x: such a subset contributes floor(x / l) = 0 and is skipped, keeping the arithmetic small and exact. Distinctness of the makeable amounts is handled entirely by the inclusion-exclusion signs — an amount reachable through several coins is counted exactly once.

The binary search converges on the smallest x whose count reaches k, which is by definition the k-th smallest element of the sorted union; duplicate amounts collapse to one before k is reached, matching the examples where 6 appears in both the 3-multiples and the 6-multiples but is still a single rank.

**Complexity:** `O(2^m · m · log(k · min(coins)))` time, `O(m)` space.
