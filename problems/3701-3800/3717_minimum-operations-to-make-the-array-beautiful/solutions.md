# Solutions — Minimum Operations to Make the Array Beautiful

## Dynamic programming over final values

Only increments exist and index 0 never moves, so a finished array is a
nondecreasing divisibility chain anchored at `nums[0]`: each later position
ends on some value at least its original one, and each of those values must be
a multiple of its predecessor. The cost of a prefix therefore depends on the
positions only through the final value the chain currently sits on, which
invites a DP over final values: `dp[v]` is the cheapest number of increments
that turns the processed prefix beautiful with its last position holding
exactly `v`.

The value axis needs a hard ceiling, and the structure supplies one. Suppose an
optimal chain lifted some non-last position above `max(nums)`. Everything after
it — still a multiple-chain — would sit at least that high too, while every
target is at most 50, so holding that whole suffix flat at the height already
reached would be legal (equal still divides) and cost nothing further, yet the
actual suffix keeps paying per element. An optimal chain never does this: every
value except possibly the last stays at or below 2500, and the last value's
cheapest fix stays under its predecessor plus 50, so 2600 bounds every final
value any optimal solution touches.

The code sieves the divisor lists of all values up to 2600 once — self
inclusive, since holding the previous height must remain a legal move — seeds
`dp[nums[0]] = 0`, and sweeps positions left to right: for each `v >= nums[i]`
it takes the cheapest divisible state `min(dp[u] : u divides v)` and adds the
`v - nums[i]` increments, leaving unreachable states at infinity. A
single-element array skips the sweep and answers 0. After the last position the
minimum finite entry is always well defined, because some legal completion
under the ceiling exists for any reachable state.

**Complexity:** `O(n · V log V)` time, `O(V)` space, where `V = 2600` and the
log aggregates divisor counts summed over the value axis.
