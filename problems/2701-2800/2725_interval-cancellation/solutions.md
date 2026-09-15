# Solutions — Interval Cancellation

A cancellable interval needs one immediate call, one repeating timer, and a
closure that retains the timer handle. The deterministic virtual-clock driver
replays those same operations without relying on wall-clock timing.

## Immediate Call and One Repeating Timer

Call `fn(...args)` before scheduling anything so the first transcript row is
recorded at time zero. Then schedule the same call with `setInterval` every `t`
milliseconds. Both calls use the captured `args`, so every execution receives
the original arguments while state held inside `fn` can still evolve from one
call to the next.

Store the interval handle and return a closure that passes it to
`clearInterval`. When cancellation runs, clearing that single handle prevents
all later repeats; clearing it after a tick does not alter calls that already
completed. If `r` executions occur and `m = args.length`, applying the
arguments accounts for the work of each invocation while timer bookkeeping
stays constant-sized.

**Complexity:** `O(r * m)` time across `r` calls with `m` arguments, `O(1)`
extra space beyond the supplied arguments and timer runtime.
