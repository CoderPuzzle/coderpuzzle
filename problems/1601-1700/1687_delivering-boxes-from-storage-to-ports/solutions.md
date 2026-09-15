# Solutions — Delivering Boxes from Storage to Ports

A voyage's cost never depends on where the ship has been — only on the
contiguous run of boxes it carries. Loaded boxes are delivered in order,
so a voyage carrying boxes `l+1` through `i` makes one trip per port run
in that stretch (consecutive boxes bound for the same port share a trip,
because the ship is already there) plus the return to storage: two plus
the number of port changes inside the window, or two when the window is
run-free. Delivering in order makes the problem a partition of the
sequence into voyages, and the minimum total is a prefix DP.

## Sliding-window DP with a monotonic deque

Let `dp[i]` be the minimum trips to deliver the first `i` boxes. The last
voyage ends at `i` and starts after some `l`, so `dp[i] = min(dp[l] +
cost(l+1..i))` over legal `l`. Count port runs with a boundary prefix
`runs[m]` — the number of positions `j < m` where `ports[j]` differs from
`ports[j+1]` — and the window's cost becomes `2 + runs[i] - runs[l+1]`:
every port change strictly inside boxes `l+1..i` forces one extra trip,
and the voyage's two fixed trips are the first port visit and the return
to storage. Pulling
everything that depends on `i` out of the min leaves
`dp[i] = 2 + runs[i] + min(dp[l] - runs[l+1])`: each candidate `l`
contributes one number, `key[l] = dp[l] - runs[l+1]`, and the DP step is
a minimum of keys over the legal window.

Legality is a sliding window on both ends. Box count restricts `l` to
`i - maxBoxes` and beyond; total weight needs `weightPrefix[i] -
weightPrefix[l] <= maxWeight`, and since weights are positive the
smallest surviving `l` only moves forward — a second pointer advances it
as `i` grows. The candidate set is the contiguous range from the larger
of the two floors up to `i-1`, and a monotonic deque of indices whose
keys strictly increase holds its minimum at the front: pushing `i-1`
pops every dominated back entry, the front is trimmed while its index
sits below the window floor, and each index enters and leaves once, so
the whole scan is linear. The running weight prefix reaches `10⁵ · 10⁵ =
10¹⁰` in the widest cases, past 32 bits — fixed-width languages carry it
in 64 bits — while `dp` and the keys stay small: trips are at most two
per box, and the answer `dp[n]` is bounded by `2n = 2 · 10⁵`.

**Complexity:** `O(n)` time, `O(n)` space.
