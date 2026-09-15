# Solutions

Every approach is a dynamic program over the same state: the number of
houses decided so far, the color of the last house (which decides whether
a new neighborhood starts), and how many neighborhoods have been used.
They differ only in whether the color loop is written as an explicit
transition or folded into a per-house relaxation; the asymptotics are
identical, so we present the direct formulation.

## Neighborhood-Indexed DP

Let `dp[i][j][k]` be the minimum cost to settle the first `i` houses with
house `i - 1` painted color `j` and exactly `k` neighborhoods formed. A
pre-painted house keeps its color at zero cost; an unpainted house tries
every color `j` with cost `cost[i - 1][j - 1]`. Extending house `i - 1`'s
color keeps `k`; any other color starts neighborhood `k + 1`. Answers are
the minimum of `dp[m][j][target]` over colors `j`, or `-1` if all states
are unreachable. Rolling the first dimension away leaves an
`O(m · n² · target)` transition count.

**Complexity:** `O(m · n² · target)` time, `O(n · target)` space.
