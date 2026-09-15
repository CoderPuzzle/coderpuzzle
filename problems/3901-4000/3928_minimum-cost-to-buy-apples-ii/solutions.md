# Solutions — Minimum Cost to Buy Apples II

Run shortest paths under both travel-price systems from every starting shop,
then combine the independent outward and return costs.

## Two weighted shortest paths per starting shop

Fix a starting shop `i`. For a purchase shop `j`, the empty trip and the
apple-carrying return are independent, so their cheapest combined travel cost
is `emptyDist[i][j] + loadedDist[i][j]`. Dijkstra's algorithm computes the
first distance array with edge weight `cost` and the second with edge weight
`cost * tax`. The best total for `i` is the minimum of `prices[j]` plus those
two distances over every reachable `j`; choosing `j = i` naturally represents
buying locally.

Repeat the two searches for each starting shop. Road costs can reach `10⁹`
and loaded costs can be one hundred times larger, so distances and totals use
64-bit integers. Disconnected components need no special case because only
vertices reached by both searches are considered.

**Complexity:** `O(n(n + m) log n)` time, `O(n + m)` space.
