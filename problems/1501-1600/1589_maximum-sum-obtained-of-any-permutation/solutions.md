# Solutions — Maximum Sum Obtained of Any Permutation

## Difference-array frequency count, then sorted pairing

Since `nums` can be permuted freely, what matters for each position is
only how many requests cover it — its "weight". Computing that weight by
walking every request's range directly costs `O(n * m)` in the worst
case. A difference array avoids that: bump a counter by `+1` at `starti`
and by `-1` at `endi + 1` for every request, then take a prefix sum over
the counter array. The running total at index `i` is exactly the number
of requests whose range includes `i`, because every request that started
at or before `i` and has not yet ended contributes its `+1`.

With a weight `freq[i]` attached to every index, the value placed there
contributes `nums[i] * freq[i]` to the grand total, so the goal reduces to
assigning the multiset of values in `nums` to the fixed multiset of
weights so that `sum(value * weight)` is as large as possible. This is
exactly the setting of the rearrangement inequality: for two sequences,
the sum of pairwise products is maximized when both are sorted in the
same order (largest with largest, smallest with smallest) and minimized
when sorted in opposite orders. So sorting `nums` descending and `freq`
descending and pairing them index by index is provably optimal — pairing
any two elements out of that order could only be improved by swapping
them back into sorted order.

The pairing is summed into a 64-bit accumulator before reducing modulo
`10^9 + 7`, since a single term can already reach roughly `10^5 * 10^5`
and the full sum across up to `10^5` indices comfortably overflows a
32-bit range even though no individual term does.

**Complexity:** `O(n log n)` time, `O(n)` space.
