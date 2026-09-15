# Solutions — Arithmetic Slices II - Subsequence

## DP on Endings by Common Difference

Counting arithmetic subsequences directly is infeasible, so the solution counts them by their ending position. For each index `i` it maintains a dictionary `dp[i]` mapping a common difference `d` to the number of arithmetic subsequences of length at least 2 that end at `nums[i]` with that difference. Length-2 sequences are the atoms: any ordered pair defines a difference, and longer slices grow by appending elements that preserve it.

The transition iterates every pair `j < i`. With `d = nums[i] - nums[j]`, every length-2-or-longer subsequence ending at `j` with difference `d` extends to one ending at `i`, and each such extension is a new slice of length at least 3 — so `dp[j][d]` is added to the global total. Then `dp[i][d]` gains those extensions plus one, the new length-2 pair `(nums[j], nums[i])` itself. Length-3-and-longer slices are thus counted exactly once, at the moment their final element is appended.

Hashing the difference per (index, difference) pair is what makes this tractable: differences can be huge (values span 32-bit range) and negative, so an array indexed by difference is impossible, but the total number of distinct `(i, d)` states is at most the number of pairs, `O(n^2)`. Duplicate values need no special handling — equal neighbors simply contribute difference 0, and runs like `[7,7,7,7,7]` accumulate correctly because each new 7 extends every earlier constant subsequence.

The recurrence never needs a "length" dimension because slices of length exactly 2 are bookkept separately from the answer: they feed the total only after being extended once more.

**Complexity:** `O(n^2)` time, `O(n^2)` space for the per-index difference dictionaries.
