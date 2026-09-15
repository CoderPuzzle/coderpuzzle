# Solutions — Count Mentions Per User

Mentions accumulate over a timeline in which every user is online except
on the 60-unit window that follows each of their OFFLINE events. Two
rules make the timeline manageable: events may arrive in any order, so
they must be replayed chronologically, and a status change at a
timestamp is applied before a message sharing that timestamp — which
decides the one ambiguous moment, the exact instant a user goes offline.

## Sort into a timeline, then sweep

Sort the events by `(timestamp, kind)` with OFFLINE ordering before
MESSAGE on ties; that single key encodes the same-timestamp rule. The
sweep then keeps one number per user, the time they come back online,
initialized to zero so everyone starts online (timestamps are at least
1). An OFFLINE event for `idi` sets that return time to `timestamp + 60`;
a message at time `t` sees user `i` online exactly when the return time
has passed (`back_at[i] <= t`) — an offline-at-`t` user is already gone
for a message at `t`, and a user returning at `t + 60` is back for a
message at `t + 60`. Each mention string is tokenized on whitespace:
`ALL` credits every user, `HERE` credits the online ones, and `id<n>`
credits user `n` — duplicates credit again, as the statement demands.

With `E` events, `U` users, and `M` total mention tokens, the sort costs
`O(E log E)` and the sweep `O(E·U + M)` (`ALL`/`HERE` scan all users,
id tokens are `O(1)`) — at most about `2×10⁶` steps at the constraint
ceilings. Counts cannot exceed `E` events times `U` users (`10⁴`), so
every counter fits 32 bits, and JavaScript's doubles hold these values
exactly. Space is the two length-`U` arrays plus the sorted copy:
`O(U + E)`.

**Complexity:** `O(E log E + E·U + M)` time, `O(U + E)` space.
