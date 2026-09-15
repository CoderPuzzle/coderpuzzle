# Solutions — Minimum Number of Refueling Stops

## Greedy with a Max-Heap of Passed Stations

The refueling decisions can be deferred: driving past a station commits you to nothing, so the car may collect every reachable station's fuel "on credit" and decide later which stops to actually make. It sweeps stations in position order, pushing each station it can still reach onto a max-heap keyed by fuel amount. Whenever the tank's range falls short of the target and no further station is reachable, the optimal move is to retroactively refuel with the largest amount among all stations already passed — stops are counted, not liters burned, so taking the biggest first minimizes the count.

The loop body captures this directly: return the stop count as soon as `fuel >= target`; otherwise the farthest reachable position equals `fuel` (one liter per mile from the start), so push every station with `position <= farthest` onto the heap, and if the heap is empty return -1 because no station can ever be reached again. Popping the maximum adds its fuel and increments the stop counter. Termination is guaranteed because every station enters and leaves the heap exactly once and each pop strictly increases the fuel.

The `<=` comparisons handle the edge cases: arriving at a station with exactly zero fuel still allows refueling there, and reaching the target with zero fuel counts as arrival. With no stations at all, the heap is empty on the first shortfall check, so the answer is 0 when `startFuel >= target` and -1 otherwise.

Example 3 drives the credit system through:

1. Fuel 10 falls short of the target 100 and reaches exactly station (10, 60), which is pushed onto the heap.
2. The largest passed fuel — 60 — is retroactively taken: stop 1, fuel 70.
3. Range 70 sweeps past (20,30), (30,30), (60,40), pushing all three; the largest, 40, is taken next: stop 2, fuel 110.
4. `110 >= 100`, so two stops suffice; the two 30-liter stations were passed but never needed.

**Complexity:** `O(n log n)` time, `O(n)` space.
