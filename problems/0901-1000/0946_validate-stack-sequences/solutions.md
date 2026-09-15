# Solutions — Validate Stack Sequences

The question is whether a stack machine that may only push `pushed`'s values in
order, and may pop whenever it likes, can be steered to emit exactly `popped` —
and the answer needs no search at all, because at every point the machine has
at most one move that can still lead to the target.

## Replay the forced moves

Walk `pushed` left to right, pushing each value onto a working stack; after
every push, pop while the top equals the next still-wanted value of `popped`.
The pair is real exactly when this replay consumes all of `popped`.

Both halves of the loop are forced, which is why the greedy replay is exact.
While the top differs from the next wanted value, that value is either not on
the stack yet — the only way it can ever reach the top is to be pushed, and
pushes happen in a fixed order — or it is already on the stack, buried under
elements pushed after it that nothing has popped; those blockers would have to
come out first, but the target demands the buried value next, so no
continuation can succeed and pressing on cannot change the verdict. And the
moment the top does equal the wanted value, popping immediately is forced too:
a popped value can never reappear on top, so deferring its pop only piles new
blockers above it. With every move dictated, one linear replay explores the
entire space of interleavings.

Each of the at most 1000 values is pushed once and popped at most once, so the
working stack never holds more than `pushed` itself and every comparison is on
plain integers — nothing here can strain time or memory.

**Complexity:** `O(n)` time, `O(n)` space.
