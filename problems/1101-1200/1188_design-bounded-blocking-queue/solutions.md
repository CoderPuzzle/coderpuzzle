# Solutions — Design Bounded Blocking Queue

## One Lock and Two Condition Variables

The queue's state is tiny — the elements and, implicitly, their count — so
safety is easy: hold a single mutual-exclusion lock for the whole of
`enqueue`, `dequeue` and `size`, and no two threads can ever observe or modify
a half-updated deque. Everything interesting comes from the second
requirement, blocking: a consumer that finds the queue empty must wait, and it
cannot wait while holding the lock, because the producer that would wake it
needs that same lock to insert.

A condition variable is exactly the primitive that resolves this. Waiting on
one atomically releases the lock and suspends the thread; being signalled
re-acquires the lock before the wait returns. So `enqueue` waits while the
count equals `capacity` and `dequeue` waits while the queue is empty, and each
operation, after mutating the deque, signals the condition the _other_ side is
blocked on — an enqueue makes the queue non-empty, a dequeue makes it
non-full.

Two details make this correct rather than nearly correct. The first is that
the wait must sit in a `while` loop, never an `if`: a woken thread has to
re-acquire the lock, and another consumer may have taken the element in
between, so the condition has to be re-tested after every wake-up (this also
covers spurious wake-ups, which the primitives are allowed to produce). The
second is using two separate condition variables, `notFull` and `notEmpty`,
rather than one. With a single condition, a signal can land on a thread of the
wrong kind — a waiting producer woken by another producer's departure — and
you are forced into a broadcast to be safe. Separate conditions mean a single
`signal` always reaches a thread that can actually make progress, so each
operation wakes exactly one thread.

Python expresses this as `threading.Condition(lock)` twice over the same
`threading.Lock`, with `wait()` and `notify()`; Java as a `ReentrantLock` with
two `newCondition()` objects, `await()` and `signal()`, and the unlock in a
`finally` so an interruption cannot leak the lock. A deque (`collections.deque`
/ `ArrayDeque`) supplies the FIFO ends in `O(1)`; a fixed array with head and
tail indices modulo `capacity` works just as well and allocates once. Note
that `synchronized` with `wait`/`notifyAll` is the same design with one
implicit condition — correct, but it wakes every waiter on each change.

**Complexity:** `O(1)` time per operation excluding the blocking wait, which by
definition lasts until the queue can serve the call; `O(capacity)` space.
