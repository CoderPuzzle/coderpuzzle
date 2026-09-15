# Solutions — Partition Equal Subset Sum

## Bitset Subset-Sum DP

If the total sum is odd, no equal split exists, so the answer is immediately false. Otherwise the problem reduces to the classic 0/1 knapsack decision: does some subset of `nums` sum to exactly `target = total / 2`? The complement of such a subset automatically sums to `target` as well, giving the two equal halves.

Instead of a boolean array, the code packs the entire reachability table into one integer used as a bitmask: bit `s` of `mask` is set exactly when some subset of the numbers processed so far sums to `s`. Incorporating a new number is the bitset shift-or step `mask | (mask << value)` — every previously reachable sum `s` makes `s + value` reachable too. This is the in-place 0/1 knapsack update (iterating sums "downward" in the array formulation), done one word-parallel operation instead of a loop.

A masking with `keep = (1 << (target + 1)) - 1` truncates bits above `target`, since sums beyond the target are useless and would only grow the integer. After each number the code checks bit `target` and returns early the moment the target becomes reachable, which also covers the single-element case where `nums[0]` already equals `target`.

The final re-check outside the loop handles the case where the target only becomes reachable with the very last number (the early return already catches it, but the closing expression keeps the function total for empty loops). All values are positive per the constraints, so every intermediate sum stays within `target` or is discarded by the mask.

**Complexity:** `O(n * target / 64)` time (n big-int OR/shift operations over `target + 1` bits, word-parallel), `O(target)` space.
