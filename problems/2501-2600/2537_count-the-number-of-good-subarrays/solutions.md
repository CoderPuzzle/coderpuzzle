# Solutions — Count the Number of Good Subarrays

## Sliding Window on Pair Count

Whether a subarray is "good" depends only on its number of equal-index pairs, and that count reacts locally to window changes: appending an element whose value already appears `c` times inside the window adds `c` new pairs, while removing an element leaves `c'` copies behind and subtracts `c'`. So a hash map of in-window counts plus a running `pairs` total lets a two-pointer sweep maintain the pair count exactly, with no re-scanning.

The loop advances `right` one element at a time, adding `nums[right]`'s contribution to `pairs` and incrementing its count. Then, while the window still has at least `k` pairs, it is good — and so is every extension of it to the right. Since exactly `n - right` subarrays share this right endpoint and start at the current `left` or later, the loop adds `n - right` to the answer, shrinks from the left (updating `pairs` by the post-decrement count of the departing value), and repeats. Counting whole families at once rather than individual subarrays is what keeps the algorithm linear even though the answer can be quadratic in size.

![Three windows of [3,1,4,3,2,2,4] with k = 2: [0..5] adds 2, then after shrinking [1..6] and [2..6] each add 1, totalling 4.](figures/solution-sliding-window.svg)

Because `pairs` only grows by bounded, well-defined amounts when the window moves, the invariant "window `[left, right]` has fewer than `k` pairs (or left just passed the last good boundary)" holds after the inner loop for every `right`. `k` larger than the total pair count of the whole array (as in the all-ones example with `k = 10`) simply never triggers the inner loop and yields 0 additional counts — but note the all-ones example returns 1 because the full array itself reaches exactly `k` pairs at the final step. Values up to 10^9 rule out counting arrays, hence the hash map.

**Complexity:** `O(n)` time, `O(n)` space.
