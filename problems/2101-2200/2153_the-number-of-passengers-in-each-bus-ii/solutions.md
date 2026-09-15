# Solutions — The Number of Passengers in Each Bus II

Capacity is what separates this from a running-count problem: a full bus
leaves passengers behind, so how many a bus boards depends on how many
earlier buses failed to clear the queue — a chain the plain per-bus
arrival count cannot see. The trick is to chase one aggregate instead of
per-bus decisions: the _total_ number boarded so far.

## Running minimum of waiting minus cumulative capacity

Walk the buses in arrival order and track two cumulative quantities:
`waiting(k)`, the passengers who have arrived by bus `k`'s time
(passengers sort before a bus at the same timestamp, matching
`t_passenger <= t_bus`), and `capacity_sum(k)`, the seats offered so far.
The total boarded through bus `k` obeys
`S(k) = min(waiting(k), capacity_sum(k) + S(k - 1))` — either the queue
runs dry or the seats do. Unrolling that recurrence collapses it to

`S(k) = capacity_sum(k) + min(0, min(j <= k) of waiting(j) - capacity_sum(j))`,

a running minimum over a per-row slack. Each bus's own count is then
`S(k) - S(k - 1)`, retrieved with `LAG` over the same arrival order, and
the outer `ORDER BY bus_id` restores the required output ordering
independently of chronology.

Each quantity is one window function over the bus rows; the waiting
counts come from the same merged passenger/bus event stream the
capacity-free variant uses (`SUM` of passenger deltas, passengers
first on ties). Buses arrive at distinct times, so every window's
`ORDER BY arrival_time` is a total order — no ties to disambiguate.

**Complexity:** `O((B + P) log(B + P))` time and `O(B + P)` space.
