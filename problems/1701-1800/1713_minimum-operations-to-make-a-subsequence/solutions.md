# Solutions — Minimum Operations to Make a Subsequence

## Longest Increasing Subsequence Reduction

Insertions into `arr` are the complement of keeping elements: the elements of `target` that already appear in `arr` in the right relative order form a common subsequence, and every missing element needs exactly one insertion. So the answer is `len(target) - LCS(target, arr)`. A general LCS is quadratic, but `target` has distinct values, which collapses the problem: map every value in `target` to its index, rewrite the elements of `arr` that occur in `target` as that sequence of indices, and drop the rest. A common subsequence of the two arrays is precisely an increasing run of indices, so the LCS length equals the longest strictly increasing subsequence of the rewritten sequence.

The rewritten sequence is processed with patience sorting: `tails` holds the smallest possible tail of an increasing subsequence of each length, and `bisect_left` finds where the next index belongs — appended when it extends every pile, otherwise it replaces the first pile tail that is `>=` it. Using `bisect_left` (rather than `bisect_right`) makes the subsequence strictly increasing, which matters when `arr` contains duplicates of the same target value: two occurrences map to the same index, and replacing in place correctly prevents both from being used.

Elements of `arr` absent from `target` are simply skipped by the index-map lookup — they can never contribute to a common subsequence but cost nothing since they may stay in `arr`. The final answer is `len(target) - len(tails)`.

**Complexity:** `O((T + A) log T)` time, `O(T)` space.
