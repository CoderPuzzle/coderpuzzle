# Solutions — Maximum Profit in Job Scheduling

## Weighted Interval Scheduling

The key insight is that this is weighted interval scheduling: after sorting jobs by end time, `best[i]` — the maximum profit achievable using only the first `i` jobs — depends on one binary decision about the `i`-th job. Skip it and inherit `best[i - 1]`, or take it and add its profit to the best schedule that ends no later than its start.

The jobs are sorted by end time (packing them as `(end, start, profit)` tuples), and a parallel array `ends` of the sorted end times turns "the latest non-conflicting prefix" into a binary search: `bisect_right(ends, start, 0, i - 1)` returns the number `j` of earlier jobs whose end time is at most this job's start time. Using `bisect_right` rather than `bisect_left` implements the rule that a job starting exactly when another ends does not overlap, and restricting the search to the first `i - 1` entries keeps the candidate predecessors within the processed prefix. The recurrence `best[i] = max(best[i - 1], best[j] + p)` then chooses between the two options.

![The four example jobs sorted by end time; the non-overlapping pair [1-3] + [3-6] scores 120.](figures/solution-job-timeline.svg)

Because `ends` is sorted (it is extracted from the sorted list in order), every binary search is valid, and processing jobs in end-time order guarantees `best[j]` is final before it is read. The virtual `best[0] = 0` anchors the induction, and the answer `best[n]` considers every job; for `n` jobs, the initial sort plus `n` binary searches is all the work there is. Ties among equal end times are harmless since such jobs mutually conflict only if their intervals actually overlap, which the start-time comparison catches correctly.

**Complexity:** `O(n log n)` time, `O(n)` space.
