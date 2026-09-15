# Solutions — Debounce

A debounced wrapper is one timer handle carried in a closure, replaced on
every call and honoured only when it survives its full window. The judge
replays the call script on a virtual clock (see the statement note), so
the setTimeout/clearTimeout code below reads exactly like production
debouncing while staying fully deterministic.

## Single Pending Timer

`debounce(fn, t)` returns a wrapper that keeps exactly one pending timer
handle. Each call first clears whatever is already scheduled — a no-op
when the closure's handle is still null — then stores a fresh
setTimeout for t milliseconds capturing that call's arguments. Only when
a stored timer actually fires does fn run, spread over the most recent
arguments; the fired slot is reset to null so the next call schedules
cleanly. Every cancelled window therefore leaves no trace at all, and
within any burst of calls closer together than t it is always the last
one whose execution survives, at the moment of that final call plus t.
The two hints describe this pair of operations verbatim: abort any
existing scheduled code, then schedule anew.

Correctness against the transcript follows from the single-handle
invariant: executions happen in increasing deadline order, each at most
t after some real call, and an execution can only be removed by a later
call arriving before its deadline elapses — which deletes precisely the
pending timer holding it. Clearing before scheduling also keeps every
instant's bookkeeping to O(1); with at most ten calls per case there is
nothing larger to reason about.

**Complexity:** `O(k)` time for k calls, `O(1)` space.
