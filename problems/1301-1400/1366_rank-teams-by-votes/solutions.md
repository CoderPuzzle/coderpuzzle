# Solutions — Rank Teams by Votes

## Approach: Position-count table with tuple sort

For every team, count how many voters placed it at each position: a 26-by-26
table `count[team][position]`. Comparing two teams under the rules is then
exactly comparing their count rows position by position (more votes wins),
falling back to the team letter when all rows tie — so sorting the teams with
that comparator produces the ranking in one pass. The rows are compared as
tuples/arrays, which every language orders lexicographically; the comparator
reverses the row order (descending counts) and keeps ascending letters.

**Complexity:** `O(V * P + T^2 * P)` time for `V` voters, `P` positions per
vote and `T <= 26` teams (the sort's comparator is quadratic in teams), plus
`O(26 * 26)` space.
