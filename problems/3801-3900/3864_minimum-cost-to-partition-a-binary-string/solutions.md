# Solutions — Minimum Cost to Partition a Binary String

## Divide and conquer over dyadic segments

A segment's cost is determined entirely by its length L and its count X of
sensitive elements: a zero-sensitive segment costs `flatCost`, any other
costs `L * X * encCost`. Since the only legal move is to halve an even
segment, the minimum cost of a segment is the smaller of paying its
no-split cost or splitting it into two equal halves and paying the sum of
their minima. This is a divide-and-conquer recurrence on intervals.

The subproblems turn out to be disjoint: every halving cuts an interval in
two, so each reachable segment appears on exactly one path from the root.
A plain recursion (no memoization needed) therefore visits each dyadic
segment once, and a prefix sum of ones answers any X in O(1). The recursion
depth is the number of times the original length can be halved — at most 17
for the `10⁵` limit — so it is far too shallow to threaten any stack.

Because X can be as large as the segment length and both `encCost` and
`flatCost` reach `10⁵`, the answer can grow to roughly `10¹⁵` (an odd,
all-ones string admits no split), so the return type is 64-bit in every
language. JavaScript's numbers stay exact here: every intermediate is a
product of integers below `10⁵`, bounded well inside `2⁵³`.

**Complexity:** `O(n)` time, `O(n)` space.
