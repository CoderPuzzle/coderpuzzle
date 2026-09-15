# Solutions — Print Zero Even Odd

## One condition variable over a shared position

The whole series is a function of one shared cursor: `position`, the next number
to emit, plus a `zero_due` flag saying whether the `0` in front of that number
comes next. A thread may emit exactly when the cursor points at one of its own
tokens — `zero` when `zero_due` holds, `even`/`odd` when it does not and
`position` has the thread's parity — and every emission advances the cursor to
the next token, so the three threads are mutually exclusive about whose turn it
is. One condition variable guards both fields; every emitter wakes all waiters,
and each waiter re-checks the cursor in a loop, so a spurious wakeup or an early
arrival just parks it again.

Termination rides the same handshake: once the final number is emitted,
`position` exceeds `n`, and every thread that wakes sees it, signals the rest,
and returns — no thread is left waiting, because each exit broadcasts before
releasing the lock. Which thread the scheduler runs first is irrelevant: a
thread that arrives ahead of its turn waits, and a thread that would overtake
cannot, because the cursor only moves under the lock and only in series order.

**Complexity:** `O(n)` synchronization steps — one wait/notify per emitted token
— and `O(1)` space beyond the shared cursor.
