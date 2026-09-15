# Solutions — Minimum Time to Complete Trips

## Binary Search on Time

The number of trips the whole fleet completes by time `t` is `sum(t // time[i])` — each bus finishes a trip every `time[i]` minutes — and this total is non-decreasing in `t`. That monotonicity is exactly what binary search needs: find the smallest `t` for which the fleet's completed trips reach `totalTrips`. The search runs over `[1, min(time) · totalTrips]`, since the fastest bus alone could run every trip back to back within that bound, and the standard lower-bound pattern (`hi = mid` on success, `lo = mid + 1` otherwise) converges on the first feasible minute.

The feasibility check is a single pass over the array computing the floor-division sum and comparing it against `totalTrips`. No scheduling needs to be simulated: buses run independently and trips simply accumulate, so the floor-sum is an exact count of trips finished by minute `t`, and the minimal feasible `t` is the required time by definition.

Each check costs one O(B) pass, and the interval of up to `min(time) · totalTrips` candidates is halved each round, giving roughly log₂(10¹⁴) ≈ 47 iterations at the constraint limits. The working set is a handful of scalars.

**Complexity:** `O(B log(min(time) · totalTrips))` time, `O(1)` space, where `B` is the number of buses.
