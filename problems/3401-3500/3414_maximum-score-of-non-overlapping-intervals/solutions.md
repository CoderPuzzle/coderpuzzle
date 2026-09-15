# Solutions — Maximum Score of Non-overlapping Intervals

Choosing at most four pairwise-disjoint closed intervals for maximum total
weight is weighted interval scheduling with a hard cap on the count, plus
a lexicographic tie-break on the chosen original indices. Sorting by right
endpoint turns every feasible pick set into a chain, which lets one DP
layer per pick count carry both the best score and the best index tuple.

## Sort by right endpoint, DP over pick count with index tuples

Sort the intervals by right endpoint and let `dp[k][i]` be the best
(score, index tuple) for choosing exactly `k` intervals among the first
`i` sorted intervals, where "best" means maximum score and, among equals,
the lexicographically smallest ascending index tuple. Interval `i` is
either skipped — `dp[k][i-1]` — or taken, in which case the remaining
`k-1` picks must come from predecessors that end strictly left of
`intervals[i][0]`: sharing even one boundary point counts as overlapping.
Because the array is sorted by right endpoint, that predecessor range is a
prefix, found by binary search on the right endpoints, so each state is
O(log n) to compute and the whole table is four passes over `n` states.

The tie-break rides along in the state. Inserting the taken interval's
original index into the predecessor's tuple keeps the tuple sorted, and
inserting a common element into two tuples preserves their lexicographic
order — so keeping one lex-smallest tuple per state is enough: whichever
branch wins on score (or on tuple, when scores tie) propagates a correct
optimum. Weights reach 10⁹ and four of them sum past 32 bits, so scores
live in 64-bit integers; JavaScript's doubles stay exact because every
intermediate stays below 2⁵³. The answer is the best layer over
`k = 1..4`, compared tuple-to-tuple — a shorter prefix is lexicographically
smaller, which settles the (weight-positive, so rare) case of equal scores
from different pick counts.

**Complexity:** `O(n log n)` time, `O(n)` space.
