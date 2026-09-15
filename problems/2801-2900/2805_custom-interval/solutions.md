# Solutions — Custom Interval

A growing linear pattern cannot ride a single fixed-period `setInterval`,
so the interval lives as a chain of one-shot timers: each execution
re-schedules the next with a delay recomputed from the running count. The
judge replays every case on its deterministic virtual clock (see the
statement note), so this real-world chaining idiom is fully reproducible —
timers drain earliest deadline first with scheduling-order ties, and the
recorded transcript holds exactly the cumulative instants that beat the
cancel timeout.

## Growing Timer Chain

`customInterval(fn, delay, period)` schedules its first tick after
`delay + period * 0`, captures delay, period, and the execution count in a
closure, and returns that first timer's id to the caller. Every firing of
the named `tick` callback runs fn, bumps the count, and re-schedules the
next tick at `delay + period * count`, overwriting a shared current-handle
binding — so the chain stays one timer wide and the latest descendant
handle is always reachable. Because gaps grow (`delay + period >= 40ms`
from the second tick on), the chain cannot outlive its cancellation or the
drain horizon: at most a couple dozen ticks ever fire inside the 1000ms
worst case.

`customClearInterval(id)` must stop the whole chain while knowing only the
id of its first, long-dead timer. A module-level registry maps each
returned id onto a getter for the currently pending handle;
cancellation resolves through that registry and clears the live end.
Clearing an unknown or already-stopped id misses the registry and returns
harmlessly, matching production `clearTimeout` semantics where stale
handles are no-ops. On the virtual clock the judged transcript then falls
out mechanically: executions record their own instants while they stay
ahead of the cancel timeout, ties at exactly `cancelTimeMs` go to whoever
registered first (only the initial tick qualifies), and once nothing
uncanceled remains the drain ends.

**Complexity:** `O(K)` time for the `K` drained ticks — `K` stays bounded
near `cancelTime / 20` because every gap grows by `period` per firing —
and `O(1)` extra space beyond the transcript and one registry entry.
