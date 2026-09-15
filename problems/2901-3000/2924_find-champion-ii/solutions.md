# Solutions — Find Champion II

"Team a is stronger than team b" is exactly a directed edge, so the teams
stronger than a are precisely the teams that can reach a — and any path
into a ends with some team holding a direct edge into a. That collapses
the champion definition onto a local graph fact: a is a champion if and
only if no edge points at it.

## In-degree scan over the edge list

Count, for every team, how many edges enter it — a single pass over
`edges` adding one to the loser's counter. A team with a positive count
lost to someone, so it cannot be champion; a team with count zero never
lost to anyone, and by the observation above nobody reaches it at all,
so it is a champion. The input guarantees the stronger-than relation is
antisymmetric and transitive, which makes the zero-count teams the
minimal elements of the whole tournament: if there is exactly one, it is
the unique champion, and if there are two or more (Example 2's teams 0
and 1), none of them is weaker than the others and the answer is -1.

One pass over the edges plus one pass over the teams gives `O(n + m)`
time with an `O(n)` counter array. All values are team numbers and counts
below n <= 100, so machine integers carry everything.

**Complexity:** `O(n + m)` time, `O(n)` space.
