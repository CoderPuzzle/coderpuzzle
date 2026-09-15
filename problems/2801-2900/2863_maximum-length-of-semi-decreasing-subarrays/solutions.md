# Solutions — Maximum Length of Semi-Decreasing Subarrays

## Sort value-index pairs descending and sweep by value group

Only the two endpoints of a subarray matter: `nums[j..i]` is
semi-decreasing exactly when `j < i` and `nums[j] > nums[i]` — everything
between the endpoints is irrelevant. So the answer is the largest
`i - j + 1` over such pairs, which is `i` minus the earliest position
holding a strictly greater value, plus one.

Sort `(nums[i], i)` pairs by value descending and sweep the sorted list in
groups of equal values. The sweep keeps `min_index`, the smallest position
merged so far. Grouping is what removes the distinct-values assumption:
when a group of one value starts, every merged position belongs to a
strictly larger value, so querying before merging means an element can
only pair with genuinely greater endpoints — equal values never pair with
each other. For each position `x` in the group, `min_index < x` yields the
candidate length `x - min_index + 1`; the guard also rejects positions of
greater values that lie to the right of `x`, which are valid pairs
backwards only. Every valid pair `(j, i)` is examined when the group of
`nums[i]` is processed, because `j` has strictly greater value and so was
merged earlier, and `min_index <= j` keeps that candidate at least as
long — so the running maximum ends at the true answer.

Sorting dominates the cost; the sweep is linear over the sorted pairs with
two passes per equal-value group. Endpoints are plain 32-bit values
(`|nums[i]| <= 10^9`) and lengths are at most `10^5`, so no 64-bit
arithmetic is needed anywhere.

**Complexity:** `O(n log n)` time, `O(n)` space.
