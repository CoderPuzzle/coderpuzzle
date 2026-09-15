# Solutions — Delay the Resolution of Each Promise

## Map each function to a wrapper that delays its settlement

`delayAll(functions, ms)` maps over `functions`; each entry becomes a
wrapper capturing its fn plus the delay. A call forwards its arguments,
then routes the returned promise's fulfillment and rejection into one
fresh executor-owned promise via
`fn(...args).then((value) => setTimeout(() => resolve(value), ms))`
chained with `.catch((reason) => setTimeout(() => reject(reason), ms))`,
so a timer armed only after the original settles fires exactly `ms` past
that moment and resolves or rejects accordingly. Both fates share the
same deferral path, matching the contract that resolving and rejecting
are delayed alike, and Promise semantics make whichever settlement call
arrives first final while late calls are ignored, so nothing extra is
needed to keep an already-decided promise honest. Because each output
entry owns one inner promise and one timer, mapping preserves the input
order of the judged settle timestamps; on CoderPuzzle's virtual clock the
internals' own delays and this wrapper's added delay arm against one
deterministic schedule captured by the harness, so Example 1 records
30 + 50 = 80 regardless of wall-clock noise.

**Complexity:** `O(n)` time, `O(n)` space for n functions in the array.
