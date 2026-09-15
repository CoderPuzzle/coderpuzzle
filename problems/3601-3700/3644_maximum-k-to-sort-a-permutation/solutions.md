# Solutions — Maximum K to Sort a Permutation

## AND across the displaced values

A value sitting in a slot that is not its own cannot settle without taking
part in at least one swap, and a swap is legal only when both values it
exchanges carry every one of `k`'s bits. Values never change as they travel,
so `k` must fit inside every value that starts away from home — `k` is a
submask of the bitwise AND of all displaced values. That AND is therefore a
ceiling on the answer; if nothing is displaced the array is already sorted
and the statement fixes the answer at `0`.

The ceiling is always attainable. Call the AND of the displaced values `m`.
Every displaced value contains all of `m`'s bits, so `m AND v` equals `m`
exactly for each of them — the value `m` itself, which always exists below
`n`, may trade places with any displaced element, and those hub swaps alone
generate every rearrangement of the displaced set. A fixed point never needs
to move, so the displaced slots hold exactly the displaced values, and
sorting the array is one of the rearrangements those swaps reach.

One pass computes it: scan `nums`, and AND together every `nums[i]` that
differs from its index `i`. The accumulator starts at `-1` (all bits set,
the AND identity) and a final clamp to `0` covers the already-sorted case,
where the scan collects nothing; a real AND over values below `n ≤ 10⁵`
never comes out negative.

**Complexity:** `O(n)` time, `O(1)` space.
