# Solutions — Maximum Sum Queries

## Sort by x and sweep the queries over a monotone descending map

Sort the points by x-coordinate descending and sort the queries by xi
descending while keeping their original indices. Sweeping the queries in that
order means every point with `nums1[j] >= xi` has been inserted before the ith
query is answered, so only the y-condition remains.

The inserted points live in a map keyed by y whose keys ascend while the
stored sums strictly descend. A pair is useless as soon as some other pair has
a larger-or-equal y and a larger-or-equal sum, so inserting `(y, x + y)`
binary-searches its slot, skips itself when the successor already reaches that
sum at a higher-or-equal key, replaces any same-key entry with a smaller sum,
and prunes predecessors whose sums do not exceed the newcomer. Each point is
inserted and removed once. Answering a query binary-searches the first key at
least yi; descending values make that entry's sum the largest among all
eligible points, and an empty suffix means no index qualifies, so the answer
is -1.

**Complexity:** `O(n log n + q log q + (n + q) log n)` time and `O(n + q)`
space.
