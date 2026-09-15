# Solutions — Most Profit Assigning Work

Workers never compete with each other: a job can be completed any number of
times, so what one worker takes never constrains another. Each worker's best
earning is decided alone — the maximum profit over all jobs whose difficulty
is at most that worker's ability — and the answer is the sum of these
independent maxima.

## Sort by difficulty, then binary-search each worker

Pair each job's difficulty with its profit and sort the pairs by difficulty.
A worker with ability `a` is eligible for exactly a prefix of this order, so
replace each profit with the running maximum over the prefix it ends: after
that pass, the entry at index `i` is the best profit available to anyone who
can clear the `i`-th easiest job. Duplicate difficulties are absorbed for
free — they occupy adjacent slots, and the running maximum keeps the richest
of them.

Each worker then costs one binary search: locate the first sorted difficulty
strictly greater than the ability (an upper bound), step back one slot, and
add that slot's prefix-maximum profit — or nothing at all when even the
easiest job is too hard, which is exactly the upper bound landing at index
`0`. Summing over workers never overflows in practice, and accumulating in a
64-bit total keeps the `10⁴ × 10⁵ = 10⁹` extreme comfortably inside range.

**Complexity:** `O((n + m) log n)` time, `O(n)` space.
