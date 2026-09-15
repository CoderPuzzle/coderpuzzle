# Solutions — Asteroid Collision

## Stack Simulation

Scan the asteroids left to right and keep a stack of survivors — a stable configuration in which every collision possible among its members has already been resolved. When the next asteroid arrives, the only collision that can involve it is with the stack's top, and only when the newcomer is negative while the top is positive: the newcomer sits to the right of everything on the stack, so it travels toward them only when it moves left, and only a right-moving survivor travels toward it. Same-direction or diverging pairs never meet, which is exactly the loop guard `asteroid < 0 < stack[-1]`.

Each fight is decided by size: if the top is smaller it explodes (popped) and the newcomer continues against the new top; if the sizes are equal both explode — the top is popped and the newcomer is spent; if the top is larger the newcomer explodes and the battle ends. A surviving newcomer is pushed. One strong left-mover can plow through the entire stack in a single arrival, which the while loop handles naturally, as in `[3,5,-6,2,-1,4]` where `-6` wipes out both `3` and `5`.

Positive asteroids never trigger the loop and stack immediately, as do negative asteroids arriving on an empty stack or on a left-moving top. Every asteroid is pushed at most once and popped at most once, so although one arrival may resolve many collisions, the total work across the whole scan is linear.

**Complexity:** `O(n)` time, `O(n)` space.
