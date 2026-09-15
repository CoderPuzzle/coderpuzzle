# Solutions — Car Pooling

## Difference Array Sweep

Whether all trips fit depends only on the number of passengers on board at each point along the route, and each trip changes that occupancy by exactly two events: +numPassengers at the pickup location and −numPassengers at the dropoff. Recording these deltas in a difference array indexed by location turns the whole question into a single sweep: accumulate the deltas in location order and check the running occupancy against capacity.

Because the locations are bounded by 1000, the code uses a fixed 1001-slot array — no sorting of events is needed; iterating the array in index order is the sweep. A crucial subtlety of the sweep order is that dropoffs are recorded at exactly the trip's end location, so a passenger leaving at location t frees seats before any pickup at t is added during the accumulation, matching the problem's "drop off before pickup at the same point" semantics.

The answer is false the first moment the running sum exceeds capacity, and true if the entire sweep stays within bounds. Empty-edge behavior is trivial: with at least one trip the array still catches any single trip exceeding capacity by itself. The difference array makes the per-trip update O(1) instead of O(trip length).

**Complexity:** `O(T + M)` time, `O(M)` space, for T trips and M = 1001 locations.
