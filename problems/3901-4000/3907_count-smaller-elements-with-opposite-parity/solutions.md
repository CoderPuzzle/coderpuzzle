# Solutions — Count Smaller Elements With Opposite Parity

Both solutions drop the quadratic rightward scan for logarithmic
bookkeeping: every crossing pair — a position and a strictly smaller
opposite-parity value after it — is counted exactly once. The merge sort
earns the counts by reorganizing: it sorts the indexes by value, and each
time a left-half element is placed the merge credits it with the placed
right-half values of the opposite parity, which are precisely the smaller
ones. The Fenwick sweep keeps the array in place instead and walks it from
the right end, asking each element's question directly — how many seen
values are strictly below mine and of the other parity? — through one
tree per parity over compressed ranks.

## Merge-sort counting split by parity

Sort the indexes by value with merge sort — indexes, not values, because
the answer is one count per position and sorting bare values would erase
it. The halving is itself the bookkeeping device: every index in the right
half sits after every index in the left half, so a left element's score
decomposes into what its own half contributes — recursion's business —
plus the right-half values strictly below it, which the merge step reads
off for free because both halves are already sorted when it runs.

The tally rides on the merge cursor, split by parity: two counters track
the right-half evens and odds placed so far. When a right-half element
places, its own counter advances. When a left-half element places, every
right-half element already placed is strictly smaller than it — the left
run is sorted, so anything that placed before an earlier head also sits
below this one — and the element is credited the opposite-parity counter
and nothing else. A drain loop credits the surviving left elements the
same way once the right half is exhausted. Each crossing pair is weighed
at the one merge whose divide separates it, never before or again.

The nonstrict `<=` comparison is what keeps equal values out: on a tie
the left element places first, so an equal right-hand value is never
counted against it — the same strictly-below reading the Fenwick queries
get from stopping one rank short. The answer entries are at most `n - 1`,
so 32-bit integers suffice, and the recursion descends about seventeen
levels at `n = 10⁵`.

**Complexity:** `O(n log n)` time, `O(n)` space.

## Two Fenwick trees over compressed values

Process `nums` from right to left, so the data structure contains exactly
the elements at indices greater than the current one. Coordinate-compress
the values into ascending ranks, then maintain one Fenwick tree for even
values and one for odd values. Each tree stores how many processed values
have each rank.

For `nums[i]`, query the tree of the opposite parity through the rank just
below `nums[i]`; the prefix count is precisely the number of smaller
opposite-parity elements to the right. Store that count in `answer[i]`, then
add the current value's rank to the tree matching its own parity. Querying
only lower ranks correctly excludes equal values.

The answer entries are at most `n - 1`, so 32-bit integers suffice.

**Complexity:** `O(n log n)` time, `O(n)` space.
