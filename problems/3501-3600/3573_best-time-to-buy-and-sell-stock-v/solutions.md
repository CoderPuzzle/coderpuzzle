# Solutions — Best Time to Buy and Sell Stock V

## State-machine DP over days and completed transactions

Track three values per day and per count `t` of completed transactions:
`done[t]`, the best total while flat; `openLong[t]`, the best total while
currently holding a bought share; and `openShort[t]`, the best total while
currently holding a sold (shorted) share. Each day offers exactly the
moves the statement allows: an open position closes (a long collects
`+price`, a short collects `-price`, completing transaction `t+1`), a flat
state opens either kind of position (`-price` to buy, `+price` to sell
short), or nothing happens.

The "can't trade on the same day you close a transaction" rule is
enforced by the update order inside a day: the close pass reads the open
rows as they were before today, and the open pass reads `done[t]` as it
was before today's closes. So a position opened today cannot close today
(closes never see it), and a transaction closed today cannot be followed
by an open today (opens never see its profit) — while a close yesterday
pairing with an open today still works, since yesterday's profits are
already folded into `done`. Impossible states are marked with a large
negative sentinel (`done[0] = 0` is the only reachable start), and the
answer is the best flat total over `t <= k` at the last day. Total profit
is bounded by `k * max(price) <= 500 * 10^9 = 5*10^11`, so 64-bit
accumulation is required and sufficient.

**Complexity:** `O(n * k)` time (each day updates `O(k)` states three
times), `O(k)` space.
