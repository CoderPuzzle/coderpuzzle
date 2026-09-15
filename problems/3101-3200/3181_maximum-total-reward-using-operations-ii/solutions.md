# Solutions — Maximum Total Reward Using Operations II

## Bitset knapsack over big integers

A value can only be taken while it strictly exceeds the current total, and an exchange argument shows the chosen values are always best taken in increasing order — if a set of values is collectable in some order, collecting it ascending keeps every prefix sum below the next value at least as easily. Duplicates can never both be used (taking x a second time would require x > total >= x), so the values are sorted and deduplicated once, and the problem becomes a 0/1 knapsack over distinct values.

The reachable totals are kept as one Python big integer dp, where bit j set means total j is achievable. The single line `dp |= (dp & ((1 << x) - 1)) << x` is the whole knapsack: the mask keeps only reachable totals j strictly below x (those are exactly the states from which x may be taken), shifting by x forms j + x, and the OR adds those states to the reachable set. Each value is applied once, preserving 0/1 semantics.

The answer is the highest set bit, dp.bit_length() - 1: totals are bounded because taking the largest value x requires a previous total below x, so the optimum is below 2·max(rewardValues) — about 10⁵ bits, which big-int AND/OR/shift operations chew through in a few machine words per limb. This is what lets n = 5·10⁴ values pass where a byte-per-state DP array would be 5·10⁴ times slower on memory traffic alone.

**Complexity:** `O(n log n + n·V/w)` time (V = max reward value, w = word size), `O(V/w)` space.
