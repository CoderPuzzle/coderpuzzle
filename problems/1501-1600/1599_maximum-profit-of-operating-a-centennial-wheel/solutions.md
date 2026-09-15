# Solutions — Maximum Profit of Operating a Centennial Wheel

## Rotation-by-rotation simulation

There's no way to skip ahead here — each rotation's boarding count depends
on exactly how many riders are waiting, which in turn depends on every
rotation before it — so the direct simulation is also the intended
solution. Walk forward one rotation at a time: pull in the next entry of
`customers` (once the array is exhausted, no more riders ever arrive
again), let up to four of the currently waiting riders board, and keep
running totals of how many riders have boarded in total and how many
rotations have happened. The loop keeps going past the end of `customers`
for as long as anyone is still waiting, since every waiting rider must
eventually be carried down.

After each rotation, the running profit is `boarded * boardingCost -
rotations * runningCost`. The candidate answer is tracked with a
best-so-far value that starts at `0` and is only replaced on a _strict_
improvement — a rotation whose profit merely ties the current best never
overwrites it. Because rotations are processed in increasing order, this
means ties always resolve to the earliest rotation that reached the
maximum, which is exactly what "minimum number of rotations to maximize
profit" asks for. Starting the best-so-far at `0` (rather than negative
infinity) also folds in the "never profitable" case for free: if no
rotation's profit ever exceeds `0`, the tracked best rotation is never
touched and the answer is `-1`.

**Complexity:** `O(n)` time, `O(1)` space.
