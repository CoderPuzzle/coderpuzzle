# Solutions — Minimum Possible Maximum Waiting Time

## Dynamic programming over cars with per-dispenser state

Cars arrive in a fixed order and the only decision is which dispenser serves
each one, so after any prefix of cars the future depends on just four small
numbers: each dispenser's remaining fuel and how much longer it stays busy.
Busy time is measured relative to the moment the current car becomes allowed
and clamped at 0 once the dispenser is free. No absolute clock is ever
needed, because a dispenser's remaining busy seconds can never exceed the
fuel it has left to dispense — every busy second dispenses one unit — so all
state components stay within the fuel budget of 50.

The sweep keeps a map from each state `(fuel0, fuel1, busy0, busy1)` to the
smallest possible maximum waiting time seen so far. Car i may go to any
dispenser j with at least `demand[i]` fuel; its wait is exactly that
dispenser's remaining busy time `r_j`, and afterwards `r_j` restarts at
`demand[i]` while the other dispenser's clock runs down by `r_j` — the next
car becomes allowed when this one starts, so the wait elapses on both
dispensers in parallel, clamped at 0. This relative-clock bookkeeping is an
exact reformulation of absolute free-at times: subtracting the elapsed wait
is precisely the drift between the two cars' allowed moments. When both
choices reach the same successor state, only the smaller running maximum is
kept; for identical futures the smaller maximum can never lose.

A car cannot be skipped, so when neither dispenser can serve car i the
process terminates and every live state represents exactly i served cars.
Maximizing the served count therefore means reaching the deepest possible
level, and the answer is the smallest stored maximum among that level's
states — or -1 exactly when car 0 already has no feasible dispenser.

**Complexity:** `O(n · S)` time and `O(S)` space, where S is the number of
reachable `(fuel0, fuel1, busy0, busy1)` states — at most `51⁴ ≈ 6.8 · 10⁶`
by the fuel bound, far fewer in practice.
