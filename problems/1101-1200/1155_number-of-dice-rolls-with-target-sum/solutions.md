# Solutions — Number of Dice Rolls With Target Sum

## Rolling-Array Counting DP

Count compositions instead of enumerating outcomes: let `dp[t]` be the number of ways for the dice processed so far to show sum `t`. One more die contributes some face `f` between 1 and `k`, so the new count at `t` is the sum of the old counts at `t - f` over all valid `f` — each distinct face value is a distinct outcome, which is why faces are summed, not counted once. The base `dp[0] = 1` represents zero dice achieving sum 0 in exactly one way.

The array is rolled die by die: for each of the `n` dice a fresh `ndp` is built, with `ndp[t] = sum(dp[t - f] for 1 <= f <= min(k, t)) mod 1e9+7`. The `min(k, t)` cap skips face values that overshoot the target, and taking the modulus inside the loop keeps every intermediate value small. Building `ndp` separately (rather than updating in place) ensures each die's transition reads only the previous die's distribution — updating in place would let one die contribute twice.

After all `n` iterations, `dp[target]` is the answer; sums no die sequence can reach (for example `target < n` or `target > n * k`) simply hold 0, since their entries never receive contributions. The counts are bounded by 30 dice and target at most 1000, so the triple loop is a few hundred thousand additions.

**Complexity:** `O(n * k * target)` time, `O(target)` space.
