# Solutions — Minimum Amount of Time to Collect Garbage

## Per-truck pickups plus travel to the last house of each type

Each truck's schedule is independent in cost: it picks up one minute per
unit of its type wherever that appears, and it must drive exactly as far
as the last house holding its type — houses beyond that point are skipped.
The trucks never interact because travel minutes are charged per truck
regardless of order.

So scan the houses once, counting every unit (all types) toward pickup
time, and record for each type the largest index at which it appears.
Then add, per type with a last index greater than zero, the sum of
`travel[0..last-1]` — cheapest via a running prefix while scanning. Types
that never appear past house 0 add nothing.

**Complexity:** `O(n + total garbage units)` time, `O(1)` space.
