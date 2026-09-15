# Solutions — Car Fleet

## Sort by position, count fleet leaders

A car's fate is decided by the time it would need to reach the target driving alone, `(target - position) / speed`. Cars cannot pass each other, so processing them from the one nearest the target backward gives a monotone chain of constraints: a car whose alone-time does not exceed the arrival time of the fleet ahead catches it at or before the target and merges, adopting the fleet's (slower) arrival time as its own; a car needing strictly more time never catches up and instead becomes the lead of a new fleet that also blocks everything behind it.

The code sorts `(position, speed)` pairs in descending position order and keeps `last_time`, the arrival time of the fleet currently being formed. Each car with `time > last_time` starts a new fleet (incrementing the count and updating `last_time`); each car with `time <= last_time` merges silently. The comparison is strict because the problem counts a car meeting the fleet exactly at the target as part of it — equality merges, only a strictly later arrival separates. Once a car merges there is no need to track anything else about it: its presence cannot slow the fleet ahead, since the fleet was already slower to arrive.

That `last_time` is only updated on new fleets is what makes one pass sufficient — it always holds the maximum alone-time among the cars of the current fleet, which is that fleet's arrival time.

**Complexity:** `O(n log n)` time, `O(n)` space.
