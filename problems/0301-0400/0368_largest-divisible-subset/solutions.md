# Solutions — Largest Divisible Subset

## Sort plus DP with parent pointers

Divisibility is transitive — if `a | b` and `b | c` then `a | c` — so in a valid subset arranged in ascending order it is enough for each element to be divisible by the previous one; the pairwise condition then holds automatically along the whole chain. That observation turns the problem into a longest-chain DP after sorting `nums` ascending: `dp[i]` is the size of the largest divisible subset ending at `nums[i]`.

For each `i`, every earlier `j` with `nums[i] % nums[j] == 0` offers an extension `dp[j] + 1`; the code keeps the best and records `parent[i] = j` so the actual subset can be rebuilt rather than just counted. The sort is essential for correctness: with ascending order, any chain built left to right is a valid subset, and every valid subset appears in sorted order, so the DP searches exactly the right solution space. After filling the table, the index with the maximum `dp` value is traced back through the parent links, and reversing the collected elements yields the subset in ascending order.

Edge cases: an empty input returns `[]`; a single element returns itself; and elements that divide nothing simply keep `dp[i] = 1` with parent `-1`, terminating reconstruction. Equal divisibility candidates never arise since all values are distinct, and `nums[i] % nums[j] == 0` with `nums[j] <= nums[i]` correctly rejects non-divisible pairs.

**Complexity:** `O(n²)` time, `O(n)` space.
