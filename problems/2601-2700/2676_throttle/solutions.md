# Solutions — Throttle

## Trailing-Call Throttle State Machine

A throttled wrapper keeps two closure variables: a flag saying whether a
window is open and a saved-latest-arguments slot for calls that landed
inside it. The first invocation executes `fn` on the spot and arms exactly
one `setTimeout(fn-window, t)`; later invocations while that timer is still
pending never touch it — they just overwrite the saved slot, which is what
makes "latest wins" automatic instead of bookkeeping-heavy.

When the timer fires there are only two futures to distinguish. If nothing
was saved during the window, the wrapper simply goes idle again. Otherwise
the saved arguments execute at the fire instant — which is where the judge's
virtual clock pins the transcript row — and a fresh window of t milliseconds
opens from _that_ moment, chaining until a quiet window finally lets the
wrapper rest. One explicit null sentinel matters throughout: an empty
argument list is a legitimate saved value and must not be confused with
"nothing stored", so membership relies on identity against null rather than
truthiness.

**Complexity:** `O(k)` time for k calls plus the chained window fires they
induce (at most k trailing executions), `O(1)` space.
