# Solutions — Race Car

## BFS on (position, speed)

Each instruction is a deterministic edge from a state `(position, speed)`: accelerating gives `(position + speed, 2 * speed)`, and reversing keeps the position while flipping the speed to `-1` or `+1` depending on its sign. Since every instruction costs 1, a breadth-first search from `(0, 1)` finds the shortest instruction sequence: the level counter equals the number of instructions used, and the first time the target position appears at the front of the queue, that count is returned.

The state space is bounded by never enqueueing a position outside `[-2 * target, 2 * target]`. An optimal sequence never needs to travel beyond twice the target — overshooting farther and reversing back is never shorter than turning around earlier — so the bound discards only states that cannot improve the answer while keeping the queue finite. Speeds are always of the form `+-2^k`, since reversing resets to magnitude 1 and accelerating doubles, so only about `log(target)` distinct speed values ever coexist with each position; the `visited` set stores exact `(position, speed)` pairs so a state is never expanded twice.

Note that both states at the same position with speeds `+1` and `-1` are distinct and both useful, which is why the speed is part of the key. The reverse instruction is always enqueued when novel, even when it looks like a step backwards, because the shortest solutions routinely reverse to shed a large speed.

**Complexity:** `O(T log T)` time, `O(T log T)` space, where `T` is the target.
