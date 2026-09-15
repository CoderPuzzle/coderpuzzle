# Solutions — Car Fleet II

## Monotonic Stack of Fleet Leaders

A car only ever slows down (to the speed of the fleet it joins), never speeds up, so when asking whether car `i` collides with some car ahead, the only relevant cars are those that will still be traveling at their original speed when `i` gets there. The solution scans right to left, maintaining a stack of cars that remain possible "first collisions" for everything to their left. Because a car can never catch anything at least as fast, any stacked car whose speed is greater than or equal to the current car's is popped immediately — the current car would close on it never.

For the car `j` now on top of the stack, the current car would reach it at time `t = (pos_j - pos_i) / (speed_i - speed_j)`. But that plan only counts if car `j` is still free-wheeling at time `t`: if `j` itself collides earlier (`answer[j] > 0` and `t >= answer[j]`), it will have merged and slowed before (or exactly when) car `i` arrives, so `j` can never be the first collision for `i` — nor for any car further left, which is why it is safe to pop it permanently and try the next stack entry. Otherwise `t` is the answer for car `i`, and `i` is pushed as a new candidate. Cars with `answer[j] == -1` never slow, so they stay valid targets forever.

Each index is pushed once and popped at most once, so despite the nested-looking loops the whole scan is linear. Cars whose entire stack is popped (everyone ahead is faster, or everyone ahead gets consumed first) keep the default `-1.0`. The stack ends up holding cars with strictly increasing speeds toward its top, which is exactly the "slower leaders further right" structure the pops enforce.

**Complexity:** `O(n)` time, `O(n)` space.
