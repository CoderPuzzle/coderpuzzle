# Solutions — Meeting Rooms III

## Two heaps over sorted meetings

Process the meetings in order of original start time, so sort first. Two min-heaps model the rooms: `free` holds the numbers of unused rooms (so the lowest-numbered room pops first, implementing the allocation rule), and `busy` holds `(end_time, room)` pairs so the room that frees earliest pops first, with the room number breaking end-time ties.

For each meeting `[s, e]`, first release every busy room whose end time is at most `s`, pushing room numbers back into `free` — releasing all of them before allocating is what makes the lowest-numbered simultaneously-free room win. If a room is free, take the smallest number and schedule the meeting as `[s, e)`. Otherwise the meeting is delayed until the earliest-finishing room opens: pop that room and reschedule with the same duration, i.e. a new end time of `old_end + (e - s)`.

A per-room counter tallies usage, and the final scan picks the room with the most meetings, using a strict comparison so the lowest index wins ties. Every meeting does a constant number of heap operations, each logarithmic in the heap size, so with `m` meetings and `n` rooms the simulation is near-linear on top of the sort.

**Complexity:** `O(m log m + m log n)` time, `O(n + m)` space.
