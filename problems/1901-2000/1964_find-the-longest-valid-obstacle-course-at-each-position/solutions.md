# Solutions — Find the Longest Valid Obstacle Course at Each Position

## Longest Non-Decreasing Subsequence Tails Array

Because a course must include obstacle `i` and list chosen obstacles in original order with non-decreasing heights, `ans[i]` is exactly the length of the longest non-decreasing subsequence of `obstacles[0..i]` that ends at index `i`. The classic patience-sorting tails structure answers this for every position in one pass: `tails[j]` holds the smallest possible tail value of a non-decreasing subsequence of length `j + 1` built from the prefix processed so far. The array `tails` is always sorted, so each new obstacle can be placed by binary search.

Since equal heights may follow each other, the lookup uses `bisect_right`: it finds the first strictly greater tail, so an obstacle equal to an existing tail extends that course rather than replacing it. If `bisect_right` returns the end of the array, the obstacle is at least as tall as every current tail and starts a new longest course; otherwise it overwrites the first tail it can improve, keeping `tails[j]` minimal and therefore the array invariant intact. The answer for the position is the insertion index plus one, which is the length of the longest course ending with this obstacle.

This is the standard `O(n log n)` longest-increasing-subsequence machinery with `bisect_right` in place of `bisect_left`, which is the only change needed to switch from strictly increasing to non-decreasing. Heights up to `10^7` cause no issue because nothing is indexed by height.

**Complexity:** `O(n log n)` time, `O(n)` space.
