# Solutions — Minimum Operations to Equalize Subarrays

Two fixed facts carry every approach. First, an operation moves an
element by exactly `k`, so its remainder modulo `k` is invariant: a
subarray can be equalized only when all its elements share one remainder,
which happens precisely when the query lies inside a maximal run of equal
remainders. Second, within such a run each element `nums[i]` sits `k *
(nums[i] / k)` above the common residue, so equalizing the subarray means
driving all the quotients `nums[i] / k` to one value with unit moves, and
the cheapest target for that is any median of the quotients. What remains
is bookkeeping: find the run containing the window, then price the moves —
the merge sort tree by decomposing the window into pre-sorted nodes and
binary searching the quotient value, the persistent segment tree by
walking two prefix versions of a value tree straight down to the median,
collecting the cost on the way.

## Merge Sort Tree Median Cost

The feasibility test needs only one linear scan: mark a new run whenever
the remainder changes from the previous element, and a query `[l, r]` is
feasible exactly when `l` and `r` carry the same run mark — anything
between two equal marks belongs to that single run. Feasible queries then
ask for a range median plus the sum of absolute deviations from it, over
the quotient array; answering many of them in logarithmic time is the
classic job of a merge sort tree, a segment tree whose every node stores
its range's values in sorted order together with prefix sums of that
order.

Each query decomposes `[l, r]` into at most two nodes per level, and that
node set stays fixed for the whole computation. The median is found by
binary searching on the quotient value: counting how many stored elements
are at or below a candidate is one binary search per node over its sorted
vector, and the smallest value whose count reaches the lower-median rank
`(m + 1) / 2` is the median. The same counts and prefix sums price the
answer without a second pass over the window: elements below the median
each climb by their shortfall (`median * below - sum_below`), elements
above each descend by their excess (`sum_above - median * above`), and
elements equal to it cost nothing.

Every total fits comfortably in 64 bits: quotients are below `10^9` and a
window holds at most `4 * 10^4` of them, so even the raw sum of absolute
deviations stays under `4 * 10^13`, far from overflow. Building the tree
costs `O(n log n)` time and space — each element lives in `O(log n)`
nodes — and each query spends `O(log n)` decomposition nodes times
`O(log n)` search steps, with the value search bounded by the 32-bit
quotient domain. A persistent segment tree over values answers the same
two questions with the same asymptotics; the tree here keeps everything
in plain arrays and rebuilds nothing per query.

**Complexity:** `O(n log n + q log² n)` time, `O(n log n)` space.

## Persistent Segment Tree

A merge sort tree re-sorts index ranges to answer value questions; a
persistent segment tree counts values directly. Compress the quotients to
their distinct values and give every prefix its own segment tree over that
value domain: version `i` counts, at each value, how many of `nums[0..i-1]`
carry it, and version `0` is the empty tree. The `n + 1` versions never
duplicate whole trees — inserting element `i` path-copies the single
root-to-leaf route of its value into fresh nodes, leaving every other node
shared with version `i - 1` — so all versions together cost `O(n log n)`
nodes, and version `r + 1` minus version `l` is exactly the window
`[l, r]`.

The difference of two versions is read with one simultaneous walk of the
two roots down the value domain, and that one walk answers both questions
at once. At each node the left children's counts subtract to the number of
window elements in the lower half of values: if that already covers the
lower-median rank `(m + 1) / 2`, the median lies to the left; otherwise
the rank is spent there, the half's count and value sum are banked as
everything strictly below the median, and the walk steps right. The leaf
it lands on names the median, and the banked prefix plus the root-level
difference of the versions' sums price both halves with no second pass:
elements below the median each climb by their shortfall
(`median * below - sum_below`), elements at or above each pay their excess
(`(window_sum - sum_below) - median * (m - below)`), and equals contribute
nothing. Infeasible windows never reach the tree — the same remainder-run
marks reject them first, and the totals stay far inside 64 bits.

Building the versions costs `O(n log n)` time and space — one copied
`O(log n)` route per element — and each query is a single `O(log n)`
descent: the value search is the walk itself rather than a binary search
over the quotient domain wrapped around a decomposition, so the extra
logarithmic factor per query goes away.

**Complexity:** `O(n log n + q log n)` time, `O(n log n)` space.
