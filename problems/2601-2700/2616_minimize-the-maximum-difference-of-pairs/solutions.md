# Solutions — Minimize the Maximum Difference of Pairs

## Binary Search with Greedy Pairing

Sort the array first: an optimal selection can always pair adjacent values in sorted order, so the question becomes whether, for a candidate cap `diff`, at least `p` disjoint pairs each within `diff` exist. That predicate is monotone in `diff` — a larger cap only admits more pairs — which makes the minimum feasible cap a target for binary search over `[0, nums[-1] - nums[0]]`.

The greedy check sweeps the sorted values once, pairing `nums[i]` with `nums[i - 1]` whenever their difference is at most `diff` and skipping a single element otherwise. Taking every cheap adjacent pair is safe by a standard exchange argument: replacing a later pairing with an earlier available one never reduces the total count, so the scan computes the maximum number of pairs under the cap.

Edge cases behave naturally: `p = 0` succeeds at the lower bound 0 since the empty set's maximum is defined as zero, and duplicates produce zero-difference pairs. Let `V = nums[-1] - nums[0]` be the value span; the sort costs `O(n log n)` and each of the `O(log V)` check iterations costs `O(n)`.

**Complexity:** `O(n log n + n log V)` time, `O(n)` space.
