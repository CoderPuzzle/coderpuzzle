# Solutions — Minimum Operations to Transform Binary String

The solution greedily covers every required `1`-to-`0` change with adjacent
pair operations.

## Greedy edge cover

Every position that starts as `1` and ends as `0` must be touched by an
adjacent-pair operation. View each such operation as selecting an edge of the
string path. Scanning left to right, select the right edge of each uncovered
required position, except at the final position where the left edge is used.
This greedy choice covers the next position whenever possible and therefore
uses the minimum number of pair operations.

If `e` edges are selected, the net change in the number of ones shows that
exactly `count1(s2) - count1(s1) + 2e` single-bit operations are needed.
Including the `e` pair operations gives the returned total. A one-character
string requiring a `1`-to-`0` change is the only impossible case.

**Complexity:** `O(n)` time, `O(1)` space.
