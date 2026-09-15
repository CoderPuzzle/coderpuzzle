# Solutions — Peeking Iterator

## Lookahead cache, one parked element

An ordinary iterator can only move forward, so `peek`'s "look but don't
touch" is impossible to answer from the cursor alone — the future has to
already be in hand. The constructor performs exactly one advance of the
underlying cursor and parks the element it lands on in a single cached
variable. From then on the two views never touch: the parked element plays
the present, the cursor plays the future, and no call ever needs to see past
the boundary between them.

Each of the three operations is then a one-liner on that state. `peek` is
the point of the design: it returns the parked element and touches nothing,
so any run of peeks is idempotent and invisible to everything that follows.
`next` hands the parked element back and immediately refills the cache with
one more cursor advance — `null`/`None`/invalid once the sequence runs dry —
so the invariant "the cache holds the next element, if any" is restored
before the call returns. `hasNext` never reads the array at all: something
remains exactly when the parked element exists.

Because the cache is primed before the first call, `next` and `peek` begin
as the same read, differing only in whether a refill follows — which is why
the order of the two calls cannot be detected. The parked element plus the
cursor is the whole state, one variable of lookahead and nothing more; the
follow-up's generic version just widens the element type while keeping this
machinery untouched.

**Complexity:** `O(1)` per call, `O(1)` extra space beyond the input (one
parked element and a cursor).
