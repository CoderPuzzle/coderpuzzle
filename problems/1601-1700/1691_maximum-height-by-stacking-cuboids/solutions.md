# Solutions — Maximum Height by Stacking Cuboids

## LIS-Style Stacking DP

Rotations are free, so each cuboid may as well present its dimensions in sorted order — placing the largest dimension up as the height and the two smaller ones as the base is always at least as good as any other orientation, since a sorted cuboid is simultaneously weakest-constrained and tallest. After sorting each cuboid's three dimensions internally, sort the cuboids lexicographically so any potential base appears before the boxes that could rest on it.

The problem then reduces to a longest-increasing-subsequence-style DP over heights: `dp[i]` is the tallest stack with cuboid `i` on top, initialized to cuboid `i`'s height. For each `i`, every earlier `j` whose three sorted dimensions are all at most cuboid `i`'s (non-strict, since equal dimensions may touch) is a valid support, and `dp[i]` takes the best `dp[j] + height(i)`. The answer is the maximum over all `dp[i]`.

Checking all earlier pairs is safe and exhaustive: the lexicographic sort guarantees that whenever `j`'s sorted triple is component-wise at most `i`'s, `j` appears before `i`, and any stacking order can be arranged so each box rests on one with smaller-or-equal sorted dimensions. A cuboid can never stack on itself, and the input never needs more than one orientation of the same box because the DP considers each cuboid exactly once.

**Complexity:** `O(n²)` time, `O(n)` space.
