# Solutions — Minimum Cost to Move Between Indices

## Directional gap prefixes

For a sorted array, every special move goes to an adjacent index. Define the
forward cost of a gap `i -> i+1` as `1` when `closest(i) == i+1`, otherwise
as `nums[i+1] - nums[i]`. Define the backward cost of the same gap as `1`
when `closest(i+1) == i`, otherwise as the raw gap. A direct jump over a
range costs exactly the sum of its raw adjacent gaps, so moving along the
line never costs more than a direct jump and every shortest path can be
represented with adjacent moves.

Precompute prefix sums of the forward and backward gap costs. For a query
`l <= r`, the answer is the forward prefix difference; for `l > r`, use the
backward prefix difference. Each closest neighbor is chosen with the
leftward tie-break required by the statement.

**Complexity:** `O(n + q)` time, `O(n)` space.
