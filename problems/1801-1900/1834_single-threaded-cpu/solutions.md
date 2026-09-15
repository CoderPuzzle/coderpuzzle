# Solutions — Single-Threaded CPU

## Sort by enqueue time, heap by processing time

Two structures divide the work. The task indices are pre-sorted by `(enqueueTime, index)`, turning the arrival stream into a sequence that only moves forward in time, and a min-heap keyed by `(processingTime, index)` holds the tasks currently available. That heap ordering is precisely the CPU's selection rule — shortest processing time first, smallest index breaking ties — so each scheduling decision is a single pop.

The main loop runs while tasks remain un-enqueued or the heap is non-empty. If the heap is empty the CPU is idle, and rather than ticking through time it jumps straight to the next task's enqueue time (clamped with `max` so the clock never runs backwards). All tasks whose enqueue time is at most the current time are then pushed before the pop happens, which is what makes the index tie-break correct: every task available at this instant competes in the same heap order.

After the winner is popped and appended to the answer, the clock advances by exactly its processing time. Each task is pushed and popped once, and enqueue times up to 10^9 cost nothing because time only ever jumps to a value drawn from the input.

**Complexity:** `O(n log n)` time, `O(n)` space.
