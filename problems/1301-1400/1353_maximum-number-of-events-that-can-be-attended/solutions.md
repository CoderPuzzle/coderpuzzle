# Solutions — Maximum Number of Events That Can Be Attended

## Day sweep with a min-heap of end days

Attend greedily by urgency: among the events still available today, the one ending soonest is the most perishable, so it should be taken first. Concretely, sort the events by start day and sweep a clock `day` forward. Each day, first push the end day of every event that has started (`startDay <= day`) into a min-heap, then discard heap entries whose end day already passed — those events are lost no matter what — and if anything remains, attend the event with the smallest end day and count it.

This exchange argument proves optimality: consider any optimal schedule and its earliest conflicting pair; swapping the later-ending event for the earlier-ending one never breaks feasibility, because any future slot that could host the earlier-ending event can equally host the other. Repeating the swap converts the optimal schedule into the greedy one without losing an attendance.

The loop runs while unprocessed events or open events remain. To avoid iterating over idle days one at a time, when the heap is empty the clock jumps straight to the next event's start day via `day = max(day, events[i][0])`, so the sweep only spends iterations on days where something can actually be attended or filtered. Each event is pushed and popped at most once, giving logarithmic heap work per event overall.

Edge cases: overlapping events sharing days are resolved by the earliest-deadline rule, events that became unreachable (end day below the current day) are silently dropped before any attendance, and days where all open events expired simply advance the clock without counting.

**Complexity:** `O((N + D) log N)` time, `O(N)` space, where `N` is the number of events and `D` the largest end day.
