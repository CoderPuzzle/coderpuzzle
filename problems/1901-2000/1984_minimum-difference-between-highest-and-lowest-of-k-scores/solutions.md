# Solutions — Minimum Difference Between Highest and Lowest of K Scores

## Sort and slide a window of size k

The picked `k` students are arbitrary, so only their highest and lowest
scores matter. To minimize that span the `k` chosen scores should sit as
close together as possible, and in a sorted array the closest `k` scores
are always a contiguous run — a run of `k` consecutive sorted elements
dominates any non-contiguous pick of the same size, because the run's
extremes are no wider apart.

So the array is sorted once, and a window of exactly `k` consecutive
positions is slid from left to right. For the window ending at index `i`
the span is `nums[i] - nums[i - k + 1]`, the sorted run's last minus its
first element. The first window starts at index `k - 1`, and each step
advances the run by one, keeping a running minimum of the spans.

Every window is inspected exactly once and each span is a constant-time
difference, so the whole pass is linear after the sort.

**Complexity:** `O(n log n)` time, `O(1)` space.
