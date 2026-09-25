# Solutions — Best Team With No Conflicts

## Sort by age, DP on non-decreasing score

The conflict rule only ever compares a younger player's score against an
older one's, so sorting the roster by age (ties broken by score) turns the
problem into: pick a subsequence, read left to right, whose scores never
decrease, maximizing the sum of the scores it contains. Once sorted, a team
without conflicts is exactly a subsequence of players whose scores form a
non-decreasing run, because within the sorted order any pair with strictly
decreasing score would pit an older, lower-scoring player against a
younger, higher-scoring one — precisely a conflict. Same-age players sit
adjacent after the sort and are compared only by score, matching the rule
that equal ages never conflict.

This is the maximum-weight non-decreasing subsequence problem. Let `dp[i]`
be the best total score of a conflict-free team that ends with the `i`-th
player (in sorted order) as its highest-index member. Then
`dp[i] = scores[i] + max(dp[j] for j < i where scores[j] <= scores[i])`,
or just `scores[i]` if no earlier player qualifies. Every pair `j < i` is
checked directly, giving an `O(n²)` scan over all pairs; the answer is the
largest `dp[i]` over the whole roster, since the best team may end at any
player.

![Sorting example 2's players by age into scores [5,5,4,6] (ages 1,1,2,2), the dp row fills left to right to 5, 10, 4, 16, and the accented arrows from each player back to its non-decreasing-score predecessors trace the best chain 5 + 5 + 6 ending at dp[3] = 16.](figures/solution-age-sorted-dp.svg)

**Complexity:** `O(n²)` time, `O(n)` space.
