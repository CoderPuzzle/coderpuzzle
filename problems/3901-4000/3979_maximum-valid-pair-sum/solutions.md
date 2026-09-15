# Solutions — Maximum Valid Pair Sum

## Sliding prefix maximum

For a pair ending at `j`, the first index must be at most `j - k`. Maintain
the maximum of all candidate first elements as `j` advances.

At each `j`, the best pair ending there is the maintained maximum plus
`nums[j]`. Track the largest such sum.

**Complexity:** `O(n)` time, `O(1)` space.
