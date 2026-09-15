# Solutions — Find Maximum Non-decreasing Array Length

## Prefix sums over block tails with a monotonic frontier

Any sequence of operations leaves nums partitioned into contiguous blocks
whose values are the block sums, and every such partition is reachable by
merging inside blocks only, so the task is to cut nums into as many
contiguous blocks as possible with non-decreasing sums. Let dp[i] be the
most blocks over the first i elements and last[i] the smallest final-block
sum among those partitions; dp never decreases from i - 1 to i, because the
previous partition stays valid after nums[i - 1] merges into its final
block.

A block (j, i] can close a partition of the first j elements exactly when
pre[i] - pre[j] >= last[j], with pre the prefix sums. Since dp is
non-decreasing, the best predecessor is the rightmost one satisfying that
inequality. Keeping every position on a frontier ordered by the key
pre[j] + last[j] — and popping an entry whenever a later position offers at
least its block count with a key no larger — leaves the keys strictly
increasing, so one binary search per position finds the rightmost usable
predecessor. Prefix sums reach 10¹⁰, so the running totals need 64-bit
integers in the fixed-width languages; the block counts stay far below 2³¹.

**Complexity:** `O(n log n)` time, `O(n)` space.
