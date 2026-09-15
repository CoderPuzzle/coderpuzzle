# Solutions — Number of Pairs Satisfying Inequality

Both solutions count the same rewritten pairs — with
`values[k] = nums1[k] - nums2[k]`, the requirement becomes
`values[i] <= values[j] + diff` for `i < j` — and both trade the quadratic
scan for logarithmic bookkeeping. The merge sort counts wholesale: halving
the array puts every right-half index after every left-half index, so one
two-pointer sweep over the two sorted halves weighs each crossing pair
exactly once, and the sort itself is the only machinery. The Fenwick tree
asks each position its own question instead — how many streamed values sit
at or below `values[j] + diff`? — and the bounded value range lets the raw
values index the tree directly, no compression step.

## Merge-sort divide-and-conquer counting

Merge sort halves the array, and the halving is the counting device: every
index in the right half sits after every index in the left, so the pair
total decomposes into pairs inside the left half, pairs inside the right
half — both recursion's business — and the crossing pairs, which the merge
step can weigh because both halves come back sorted. Bare values suffice as
the sort key here: the answer is one number, not a per-position report, so
nothing needs to ride along with the values through the sort. The per-index
differences may be negative and no coordinate shift is made — merge
comparisons only need ordering, which is indifferent to sign.

At a merge over sorted halves, the crossing partners of a right-half
element `values[j]` are exactly the left-half values at or below
`values[j] + diff`, and because the left half is sorted they form a prefix
of it. The right half is sorted too, so walking it in ascending order
visits bounds that only rise, and one pointer into the left half advances
monotonically ahead of that walk — each right element is credited the
pointer's stopping index, never re-scanning values an earlier bound already
admitted. The comparison is the predicate verbatim,
`left[p] <= values[j] + diff`, so ties count when `diff >= 0` and a
negative `diff` needs no guard: a bound below every left value simply
leaves the pointer where it stands and that element contributes nothing.

The merge that follows is the ordinary stable one — the left element wins
ties — with the left half copied out first; the counting pass and the merge
each read the halves once, so a merge costs time linear in its span. Every
pair is weighed at exactly one merge, the one whose divide separated it:
never before both halves were sorted, never again after. On the statement's
first example the differences `[3, -1, 4, 1]` with `diff = 2` halve into
`[3, -1]` and `[4, 1]`; the inner merges sort them to `[-1, 3]` and
`[1, 4]` while counting nothing (the bounds 1 and 3 admit neither 3 nor
4), and the top merge credits the right value `1` the prefix `-1, 3`
(bound 3) and the right value `4` that same prefix again (bound 6), for
the reported 4.

Recursion depth is the sort's height — about seventeen frames at
`n = 10⁵` — and the left-half copy plus the differences array are the only
extra storage. The tally itself can reach `n(n-1)/2`, near five billion at
the ceiling, so the accumulator is 64-bit in every language.

**Complexity:** `O(n log n)` time, `O(n)` space.

## Fenwick tree over transformed values

Rearranging the condition `nums1[i] - nums1[j] <= nums2[i] - nums2[j] + diff` puts all of index `i` on one side and all of `j` on the other: `nums1[i] - nums2[i] <= nums1[j] - nums2[j] + diff`. Defining `values[i] = nums1[i] - nums2[i]`, the task is to count pairs `i < j` with `values[i] <= values[j] + diff` — a classic "count earlier elements at most a bound" sweep.

Scan left to right; for each position `j`, query how many previously inserted values are `<= values[j] + diff`, add that to the count, and only then insert `values[j]` — inserting after querying is what enforces `i < j`. Because the inputs are bounded (`|values| <= 2 * 10^4`), the values fit a Fenwick tree (binary indexed tree) over their raw range after shifting by the minimum, with no coordinate compression: `update` adds 1 at the value's slot, and `query` reads the prefix sum up to the clamped target. The clamping is also the guard for negative `diff` — when `values[j] + diff` falls below every value seen so far (or below the whole range), the prefix index drops to zero and the pair count for that `j` is simply 0.

Both Fenwick operations cost logarithmic time in `V`, the spread between the minimum and maximum transformed value (at most `4 * 10^4 + 1`), and the tree is the only auxiliary storage.

**Complexity:** `O(n log V)` time, `O(V)` space.
