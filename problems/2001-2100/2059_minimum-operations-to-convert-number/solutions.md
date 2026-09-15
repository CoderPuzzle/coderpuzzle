# Solutions — Minimum Operations to Convert Number

## Breadth-first search over valid states

Only values from 0 through 1000 can be expanded, so run breadth-first search over those 1001 states starting from `start`. For every dequeued value and every number, generate the addition, subtraction, and bitwise-XOR results; BFS depth is the number of operations used.

Check each generated result against `goal` before applying the range restriction, because an out-of-range result is allowed as the final operation. Enqueue only unseen results inside `[0, 1000]`, which prevents cycles and guarantees that each expandable state is processed at its shortest distance.

**Complexity:** `O(1001 * nums.length)` time and `O(1001)` space.
