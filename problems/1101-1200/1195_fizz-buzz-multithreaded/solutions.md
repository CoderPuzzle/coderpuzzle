# Solutions — Fizz Buzz Multithreaded

## One condition variable over a shared position

Each of the four threads owns one predicate on the shared `position` — the index
whose token comes next — and may emit exactly when its predicate holds:
`fizz` on multiples of 3 that are not multiples of 5, `buzz` the mirror image,
`fizzbuzz` on multiples of 15, `number` otherwise. Every emission increments
`position` under the lock and wakes all waiters, and each waiter re-checks its
predicate in a loop, so whichever thread the scheduler runs first can only emit
the token that is actually due. The word callbacks are bare (their token is the
log entry); `number` hands its value to `printNumber`, and the shared log ends
up holding exactly the `1..n` fizzbuzz series.

Termination rides the same handshake: once `position` passes `n`, every waking
thread sees it, signals the rest, and returns, so no thread is left parked and
the four methods all finish without a stray wait.

**Complexity:** `O(n)` synchronization steps — one predicate check per emitted
token, one wake broadcast per step — and `O(1)` space beyond the shared cursor.
