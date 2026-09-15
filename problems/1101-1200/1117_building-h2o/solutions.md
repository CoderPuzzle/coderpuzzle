# Solutions — Building H2O

## Two Counting Semaphores plus a Three-Way Barrier

The grouping rule is really two rules at once, and each needs its own
primitive. The first is a **capacity** rule: at most two hydrogen threads and
at most one oxygen thread may belong to the molecule currently being formed.
Counting semaphores express that directly — a semaphore initialized to 2 for
hydrogen and to 1 for oxygen. A thread acquires its permit before emitting, so
however many threads the judge starts, the atoms emitted while a molecule is
open are already exactly two `H` and one `O`.

The second is a **completion** rule: the next molecule must not begin until the
current one is finished. Permits alone do not give this. If a hydrogen thread
emitted and released its permit immediately, a hydrogen thread of the next
molecule could acquire that permit and emit before this molecule's oxygen had
emitted, splitting a group across the boundary the judge checks. So the three
threads meet after emitting: a barrier that trips on three arrivals holds each
of them until all three atoms are in the log, and only then does each thread
release its permit. A cyclic barrier resets itself, so the same object serves
every molecule.

The resulting body is the same four steps in both methods — acquire, emit, wait
at the barrier, release — and the ordering of those steps is the whole proof.
Because the permit is released strictly after the barrier trips, no thread of
molecule `k + 1` can emit before all three atoms of molecule `k` have been
emitted, which is exactly "every consecutive group of three holds two `H` and
one `O`". Nothing depends on the order in which the judge starts the threads,
so the solution is correct under every scheduling rather than under a lucky
one.

Python uses `threading.Semaphore` and `threading.Barrier`; Java uses
`java.util.concurrent.Semaphore` and `CyclicBarrier`, translating the barrier's
`BrokenBarrierException` into an `InterruptedException` since a broken barrier
can only mean the schedule was torn down. A `Phaser` with three registered
parties works identically in Java if you prefer it.

**Complexity:** `O(1)` time and space per thread, `O(1)` shared state — each
thread performs one acquire, one emit, one barrier wait and one release, and
the object holds two semaphores and one barrier regardless of `n`.
