# Solutions — Number of Ways to Stay in the Same Place After Some Steps

## Linear DP over Bounded Positions

The crucial observation is that the pointer can never be farther than `steps` positions from index 0, since each of the `steps` moves changes the position by at most one. So even though `arrLen` can be 10^6, only the window `n = min(arrLen, steps + 1)` is reachable, and the complexity is independent of how large `arrLen` is beyond that.

The DP keeps a one-dimensional array `dp` where `dp[i]` is the number of ways to be at position `i` after the moves processed so far, starting from `dp[0] = 1`. Each step produces a new array in which position `i` receives ways from three predecessors: staying (`dp[i]`), moving right from `i − 1`, and moving left from `i + 1`, with both neighbors guarded by the window bounds. Every entry is reduced modulo 10^9 + 7 as it is computed, so values stay small throughout.

After exactly `steps` iterations, `dp[0]` is the number of walks that return to the origin. The window bound handles the edge cases automatically: when `arrLen` is 1 the window is a single cell and only "stay" moves contribute; when `arrLen` is huge the truncated window still contains every reachable position.

**Complexity:** `O(steps · min(arrLen, steps))` time, `O(min(arrLen, steps))` space.
