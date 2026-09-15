# Solutions — Minimum Cost to Equalize Array

## Enumerate the shared target

Every operation only increases values, so the array converges to some
common final value `F` at least `max(nums)`. For a fixed `F`, let `T` be
the total deficit `Σ (F − nums[i])`. A pair op consumes one unit of deficit
from each of two different indices, so it can never give a single index
more than one unit per round: if the largest single demand `P = F − min`
were scheduled alone, the other indices together supply exactly `T − P`
partner units, capping pairs at `T − P`; parity caps them at half the total
as well. Both caps are jointly attainable by always pairing the two largest
remaining demands, and since that exhausts the useful pairing budget,
`cost(F) = pair · cost2 + rest · cost1` with those maximal counts.

Pair ops are worth their price exactly while `cost2 < 2 * cost1`; past
that the answer is simply every deficit paid through single ops at target
`max(nums)`. When they are cheap, the scan walks candidates from
`max(nums)` through `2 * max(nums)` — every step above shifts all deficits
by one, and once the array is far enough under the target any two extra
steps add exactly `n * cost2` with identical leftover parity, so costs are
strictly increasing out there and no minimum can hide beyond the bound.
Each step is O(1) off running totals, giving a linear pass over values
plus a linear walk over candidate targets with 64-bit-safe arithmetic
throughout.

**Complexity:** `O(n + max(nums))` time, `O(1)` space.
