# Solutions — Min Max Game

## Level-by-level simulation

The array shrinks by half every round, so simply doing what the statement
says is already optimal. Keep the current array and rebuild it: new position
`i` takes `min` of its pair when `i` is even and `max` when `i` is odd,
exactly as the algorithm prescribes.

Each round costs the current length, and the lengths form the geometric sum
`n + n/2 + n/4 + ...`, so the total work over all rounds is linear in `n`.
When a round leaves one element, that element is the answer.

**Complexity:** `O(n)` time, `O(n)` space.
