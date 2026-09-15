# Solutions — Longest Increasing Subsequence

Two ways to find the length of the longest strictly increasing
subsequence: the direct quadratic DP that defines the problem over
endings, and the patience method that replaces the inner scan with a
binary search over a tails array. Both give the same answer; the patience
method answers the statement's follow-up.

## patience

The solution maintains `tails`, where `tails[k]` is the smallest value that can end an increasing subsequence of length `k + 1` seen so far. This array is always sorted — replacing an element with a smaller valid tail cannot break order — which is what licenses binary search.

For each new element `x`, `bisect_left` finds the first tail that is greater than or equal to `x`. If no such tail exists, `x` extends every existing subsequence, so it is appended and the best length grows by one. Otherwise `x` replaces that tail: it cannot lengthen any subsequence (it's not bigger than all tails), but it can end a subsequence of the same length more cheaply, leaving more room for future elements to extend it. Using `bisect_left` rather than `bisect_right` enforces strict increase — an equal value overwrites its own tail instead of extending it, which is why an all-equal input like `[7,7,7,7]` yields length 1.

A subtle but important point: `tails` is generally _not_ itself a valid subsequence of the input; only its length is meaningful. The replacement step may patch a tail in a way no actual subsequence matches. That is harmless because the invariant preserved is about the _existence_ of an increasing subsequence of each length ending at each tail value, and the answer only reads `len(tails)`.

Running the statement's Example 1, `[10, 9, 2, 5, 3, 7, 101, 18]`, through the scan:

1. `10` finds no tail to replace, so it is appended: `tails = [10]`.
2. `9` replaces the tail `10`: `tails = [9]`; then `2` does the same: `tails = [2]`.
3. `5` is larger than every tail and appends: `tails = [2, 5]`.
4. `3` replaces the tail `5`: `tails = [2, 3]` — same length, cheaper ending.
5. `7` and `101` each extend the array: `tails = [2, 3, 7, 101]`, matching a real subsequence so far.
6. `18` replaces `101` (`bisect_left` lands on index 3): `tails = [2, 3, 7, 18]`. The length 4 is the answer even though `[2, 3, 7, 18]` is not itself a subsequence of the input.

With `n` up to 2500 this comfortably answers the follow-up: the quadratic DP that compares every earlier element is replaced by `n` binary searches. Single-element arrays return 1, and strictly decreasing inputs never append after the first element.

**Complexity:** `O(n log n)` time, `O(n)` space.

## dp_quadratic

The direct transcription of the definition. `dp[i]` is the length of the longest increasing subsequence that ends exactly at `nums[i]` — every subsequence ends somewhere, so the answer is `max(dp)`. A subsequence ending at `i` either is `nums[i]` alone (length 1, the seed) or extends some shorter chain: any earlier `nums[j] < nums[i]` can be the element directly before `nums[i]`, so `dp[i]` is one plus the largest `dp[j]` among those predecessors.

Each entry therefore scans every earlier index, comparing values and taking the best chain — the `j < i` double loop that gives the method its quadratic cost. With `n <= 2500` that is at most ~3 million comparisons, comfortably inside the limits here, and the table itself makes the correctness argument transparent: `dp[i]` is computed only from final, already-settled entries because it reads strictly earlier positions.

Strictness comes from the guard `nums[j] < nums[i]`, not `<=`: an equal value cannot extend a chain, so `[7, 7, 7, 7]` leaves every `dp[i]` at 1. Decreasing inputs never find a predecessor and also stay at 1, and a single-element array returns its seeded 1 without entering the outer scan in any meaningful way.

**Complexity:** `O(n²)` time, `O(n)` space.
