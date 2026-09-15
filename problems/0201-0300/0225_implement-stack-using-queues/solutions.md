# Solutions — Implement Stack using Queues

## One queue, rotated on push

The stack is a single queue held in one invariant: the front of the queue is always the top of the stack. `push` breaks that invariant for a moment — the new value enters at the back, behind everything already stored — then repairs it by dequeuing each older element and enqueueing it again behind the newcomer. The queue afterwards holds the same values in the same cyclic order, rotated so the new value sits at the front. The rotation itself uses nothing beyond a queue's standard operations: push to back, pop from front, size.

With the invariant in place, every other method is a single operation on the queue's front. `pop` dequeues and returns the front; `top` peeks it without disturbing anything; `empty` asks whether the size is zero. No method other than `push` ever iterates or copies, so a sequence of queries between pushes is all constant-time work.

The `O(n)` cost is put on `push` deliberately. The two-queue classic pays the same transfer per push while keeping a second structure in step with the first, and the rotate-on-pop alternative would instead tax `pop` and `top` — exactly the operations a stack is used through — while leaving `push` cheap. The statement allows "only two queues", which one queue comfortably satisfies, so this shape answers the follow-up outright rather than deferring it.

**Complexity:** `push` in `O(n)` over the `n` stored elements; `pop`, `top`, and `empty` in `O(1)`; `O(n)` space.
