# Solutions — Time Needed to Buy Tickets

## Count each person's purchases

Let the target person need `t = tickets[k]` tickets. Everyone at or before position `k` gets a chance to buy in each of the target's `t` rounds, so person `i <= k` contributes `min(tickets[i], t)` seconds.

The process ends as soon as person `k` buys for the last time, before anyone behind them acts in that round. Therefore each person `i > k` contributes at most `t - 1` purchases, giving `min(tickets[i], t - 1)`; summing these contributions yields the exact finish time.

**Complexity:** `O(n)` time and `O(1)` auxiliary space.
