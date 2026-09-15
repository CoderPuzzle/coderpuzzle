# Solutions — Minimum Cost to Convert String II

## String-graph shortest paths plus a prefix DP

Operations on one window chain (the identical-indices rule), and windows
never interact across different positions (the disjointness rule). So a
segment of the string is really converted along a shortest path in a
graph whose nodes are the distinct strings appearing in `original` and
`changed` — at most `2m` of them — with an edge `original[j] ->
changed[j]` of weight `cost[j]`, keeping the cheapest edge per pair.
Floyd-Warshall over at most 200 nodes precomputes every pairwise
conversion cost, collapsing arbitrarily many chained operations on one
window into one number.

The disjointness rule then makes the whole problem a partition of the
string into independent segments: `dp[i]` is the minimum cost to convert
the first `i` characters. Either position `i - 1` already matches and
`dp[i]` carries over from `dp[i - 1]`, or some suffix segment
`source[j..i) -> target[j..i)` is applied at `dp[j] + cost-of-path`. To
find, for each start `j`, every segment length whose source and target
windows are known conversion strings, walk a trie of those strings along
`source` and `target` in lockstep from `j` — every depth where both
walks stand on a complete string is a usable segment. The answer is
`dp[n]`, or `-1` when it stays unreachable.

Costs reach `10⁶` per operation and a 25-operation chain over 1000
single-character positions sums to `2.5 × 10¹⁰`, which overflows 32-bit
arithmetic — hence the 64-bit answer. With `n <= 1000` and `m <= 200`
the work is `O(m³ + n·L)` where `L` bounds total matched trie depth.

**Complexity:** `O(m³ + n · L)` time for the Floyd-Warshall pass over
the at-most-200 strings plus the DP trie walks (`L` bounds total matched
depth), `O(m² + T)` space for the distance matrix and the trie.
