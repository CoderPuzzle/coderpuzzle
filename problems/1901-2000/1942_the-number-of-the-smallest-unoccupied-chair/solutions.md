# Solutions — The Number of the Smallest Unoccupied Chair

## Two-Heap Simulation in Arrival Order

Simulate the party chronologically. Friends are processed sorted by arrival time (distinct by the constraints), and at each arrival two questions must be answered quickly: which chairs have become free by now, and which free chair has the smallest number. Two min-heaps cover both — `occupied` holds `(leaving_time, chair)` pairs so the earliest departures surface first, and `free` holds chair numbers so the smallest available number surfaces first. A `next_chair` counter mints brand-new chairs only when nothing is free, which is exactly the infinite-chair rule.

Before seating an arriving friend, the solution pops every `occupied` entry whose leaving time is at most the arrival time, pushing those chairs into `free`. The `<=` comparison matters: a friend leaving at the same moment another arrives frees the chair in time for the newcomer, as the problem statement requires. The friend then takes `free`'s minimum if any chair is free, otherwise the next never-used number, and the chair goes back into `occupied` keyed by that friend's own departure.

The loop stops as soon as the target friend is seated, returning that chair without simulating later arrivals — everything after is irrelevant to the answer (the trailing `return -1` is unreachable given the constraints but keeps the function total). Since a chair is created only when needed, chair numbers never exceed `n - 1` and both heaps stay bounded by `n`; every friend performs a bounded number of amortized heap operations because each chair is pushed and popped from each heap at most once per seating cycle.

**Complexity:** `O(n log n)` time, `O(n)` space.
