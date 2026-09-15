# Solutions — Print in Order

## Two one-shot gates

The contract is a chain of two "happens-before" edges: `second` must not emit
before `first` has, and `third` must not emit before `second` has. A one-shot
gate per edge is the whole mechanism — in Python a pair of
`threading.Event` objects, in Java a pair of `CountDownLatch(1)`.

`first` has nothing to wait on: it emits immediately and then opens the gate
behind it. `second` waits on that gate, emits, and opens the second gate;
`third` waits on the second gate and emits. The emit-then-open ordering
inside each method is what makes the chain airtight: a gate is only opened
after its method's token is already in the log, so the waiting thread can
never overtake the emitting one.

Which thread the scheduler runs first is irrelevant — a thread that arrives
early simply parks on its gate until the predecessor has finished. Each gate
is used once, matching the one-call-per-method schedule, and nothing else is
shared, so no thread ever blocks a thread it does not depend on.

**Complexity:** `O(1)` time and space per thread — one wait and at most one
signal each, with two one-bit gates held regardless of the schedule.
