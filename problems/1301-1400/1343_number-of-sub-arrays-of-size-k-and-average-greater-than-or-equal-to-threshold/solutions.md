# Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold

## Approach: Sliding window with an integer comparison

A window of size k qualifies when its average is at least the threshold —
multiplying both sides by k turns that into the exact integer test
`window_sum >= k * threshold`, so no fractional averages are ever formed.
The sum of the first k elements seeds the window; each step right adds the
entering element and removes the leaving one, an O(1) update, and the
qualifying windows are counted as they pass.

![Sliding window over arr = [2,2,2,2,5,5,5,8] with k = 3, threshold = 4: window sums 6, 6, 9, 12, 15, 18 against the bar 12 = k·threshold — exactly 3 windows qualify.](figures/solution-window-sum-bar.svg)

Every window is examined exactly once, in order of its start index.

**Complexity:** O(n) time, O(1) extra space.
