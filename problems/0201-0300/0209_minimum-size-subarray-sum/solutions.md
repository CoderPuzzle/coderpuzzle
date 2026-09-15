# Solutions — Minimum Size Subarray Sum

Two ways to exploit the same fact — every element is positive, so sums
only grow as a window extends. One walks both ends of a window across
the array in a single linear pass; the other precomputes prefix sums and
binary-searches each start position's shortest qualifying run.

## sliding_window

Because every element is positive, a window's sum strictly grows when the right end advances and strictly shrinks when the left end retreats. This monotonicity is what makes two pointers valid: for any right end, there is a unique smallest left end reaching the target, and that boundary only ever moves rightward as `right` does — so both pointers together make at most `n` steps each.

The scan advances `right` absorbing each element into `window`, and whenever the sum is at least `target`, records the current length `right - left + 1` and then shrinks from the left, subtracting `nums[left]`, while the sum stays large enough. This inner loop both finds the minimal window ending at this `right` and leaves the window in the leanest state for the next extension, so no candidate window is missed.

![Window snapshots for target 7 over [2,3,1,2,4,3]: the window grows to sum 8, shrinks twice as right reaches 4, and finally settles on [4,3] with sum 7 and length 2.](figures/solution-window-states.svg)

`best` starts at `n + 1`, an impossible length, so if the whole array never reaches `target` the sentinel survives and the answer is 0. A single element at least the target immediately yields length 1.

**Complexity:** `O(n)` time, `O(1)` space.

## prefix_bisect

Prefix sums turn every subarray sum into a difference: `sum(nums[i..j)) = prefix[j] - prefix[i]`. So the shortest run starting at `i` that reaches `target` ends at the smallest `j > i` with `prefix[j] >= prefix[i] + target` — a lower-bound query. Because every element is positive, `prefix` is strictly increasing, which is exactly the sortedness the binary search relies on; with zeros or negatives the array would be merely non-decreasing or unsorted and the query could not skip candidates.

The algorithm is then mechanical: build `prefix` in one pass, and for each `i` binary-search `[i + 1, n]` for the first entry at least `prefix[i] + target`. If the search lands on a real index (rather than running off the end), `j - i` is a candidate answer, and the minimum over all starts wins. The sentinel `n + 1` again encodes "never met", returning 0 when no start position produces a qualifying run.

Positivity also makes the two variants agree beyond the answer: the same monotonicity that lets the two-pointer window skip re-examination lets each binary search stop at the first qualifying end. The cost is the extra table and the logarithmic factor — the price of a formulation that would generalize to searching with a merge-sort or segment tree when elements may be negative.

**Complexity:** `O(n log n)` time, `O(n)` space for the prefix table.
