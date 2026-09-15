# Solutions — Minimum Skips to Arrive at Meeting On Time

Working in fractional hours invites precision bugs, and searching skip
subsets is exponential. Both go away with one DP over integer units of
`dist * speed`: keep `dp[j]`, the smallest accumulated travel time
(measured as distance, since speed is constant) after finishing road
`i` having used exactly `j` skips, with every taken rest already rounded
up to the next whole hour.

## Skip-count DP on scaled times

For each road with length `d`, a state at time `t` arrives at `t + d`.
Taking the rest is free but rounds the arrival up to the next multiple
of `speed` (a whole hour); skipping keeps `t + d` exactly but consumes
one skip. So from `dp[j] = t`: rest updates `dp[j]` with
`ceil((t + d) / speed) * speed`, and skip updates `dp[j + 1]` with
`t + d`. The last road offers neither choice — no rest follows it — so
its arrival is simply `dp[j] + d`. The answer is the smallest `j` whose
final value is at most `hoursBefore * speed`; if none qualifies, return
`-1`.

Because ceiling is monotone, keeping only the minimum time per skip
count is safe: any other reachable time at the same count rounds to a
value at least as large on every future road. All arithmetic stays
integral — values are bounded by `hoursBefore * speed + max(dist)`-ish
magnitudes well inside 64 bits.

**Complexity:** `O(n^2)` time for `n` roads, `O(n)` space.
