# Solutions — Timeout Cancellation

A cancellable timeout is one pending timer captured in a closure and a
cancel function that clears it. Because the judge replays each case on a
deterministic virtual clock (see the statement note), the
setTimeout/clearTimeout code below reads exactly like production
timeout-cancellation while the recorded transcript stays fully
reproducible: whichever timer owns the smaller deadline fires first, so
the transcript contains either no rows (the cancel landed before t) or a
single row stamped at exactly t with fn's return value.

## One Pending Timer

`cancellable(fn, args, t)` schedules one setTimeout for t milliseconds
whose callback spreads the captured `args` into fn and returns, then
returns an arrow that clears that stored handle. The driver builds its
recorder as the fn it passes in — every actual execution of that recorder
pushes the `{"time": ..., "returned": ...}` row — so three outcomes cover
all cases. If cancelTimeMs < t, the cancel timer's deadline sorts first:
clearTimeout marks the execution canceled before any firing, and the
judged transcript is empty. If cancelTimeMs >= t, the execution timer
fires at virtual time t first, recording fn evaluated over args; when the
cancel timer afterwards fires harmlessly there is nothing left to clear,
matching real clearTimeout semantics where stale handles are no-ops.
Invoking the returned function more than once merely re-clears an already
cleared handle. Scheduling happens once per case, so bookkeeping is O(1)
per case regardless of argument shapes; the spread of at most ten
arguments is proportional to `args.length`.

**Complexity:** `O(args.length)` time to apply the call arguments, `O(1)`
extra space.
