# Solutions — Meeting Rooms II

## Sorted Starts with a Min-Heap of End Times

The number of rooms required equals the peak number of simultaneously running meetings. Processing meetings in order of start time makes each arrival a simple decision: it either reuses a room that has been vacated by now, or it forces a new room. Which room is free is irrelevant — only the _earliest_ end time among occupied rooms matters, which is exactly what a min-heap of end times exposes at its top.

After sorting the intervals by start time, each meeting `[start, end]` checks the heap's minimum: if the smallest end time is at most `start`, some room is free before this meeting begins, so that room is reassigned via `heapreplace` (pop the earliest end, push the new one); otherwise every room is still busy and a new one is allocated with `heappush`. Because the heap only ever grows on genuine conflicts, its final size is the maximum concurrency observed — the minimum number of rooms, since no algorithm can do better than the peak overlap.

Sorting dominates the cost at `O(n log n)`, and each of the `n` heap operations costs `O(log n)`; the heap can grow to hold all `n` meetings when they all overlap. Ties are handled correctly by the `<=` comparison: a meeting starting exactly when another ends can reuse its room.

**Complexity:** `O(n log n)` time, `O(n)` space.
