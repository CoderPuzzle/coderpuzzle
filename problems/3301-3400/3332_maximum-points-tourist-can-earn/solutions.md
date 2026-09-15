# Solutions — Maximum Points Tourist Can Earn

Only the tourist's current city matters for what future days can earn, so
the whole search space collapses into one layer of best scores per day.

## Rolling day layers

Let `dp[j]` be the best total score after the days processed so far when
the tourist stands in city `j`; initializing every `dp[j]` to 0 encodes the
free choice of the starting city, because starting anywhere costs nothing.
Day `i` then gives each city exactly two ways to be occupied: stay put,
scoring `dp[j] + stayScore[i][j]`, or be reached by a move `c -> j`,
scoring `dp[c] + travelScore[c][j]`. After `k` sweeps the answer is the
largest entry of the final layer.

The move maximum may freely include `c == j`: the constraint
`travelScore[i][i] == 0` makes that term a 0-point no-op, and a journey
that "does nothing" on some day can be turned into a genuine journey by
staying that day (worth at least 1 point), so the no-op never produces a
larger answer — it only lets the sweep read whole rows and keeps the code
free of a special case. The layer is rebuilt into a fresh array each day so
no same-day state bleeds into itself.

**Complexity:** `O(k * n²)` time, `O(n)` space.
