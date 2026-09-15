# Solutions — Alt and Tab Simulation

## Reverse scan for last touches

Each query detaches one window and puts it on top; every other window keeps
its relative order and merely shifts down a slot. Between two lifts the
stack therefore never shuffles, and from any moment on, one window can only
end up above another by being lifted later. So any two queried windows
finish in order of their last press — the newer press on top — while the
windows that no query ever names are never detached at all: they keep their
original relative order and sit beneath every queried window. The final
state is exactly "windows ordered by most recent last touch first, then the
never-lifted windows in their original order".

That ordering is what a reverse walk over `queries` emits. Scanning from
the last query back to the first and appending each window not yet appended
visits last touches newest-first and skips earlier presses of the same
window, because only the final press decides its height; one boolean flag
per window id makes each skip constant time. A second pass over `windows`
then appends the still-unmarked values left to right — precisely the
never-lifted windows in their original bottom-up order. For
`windows = [1,2,3]`, `queries = [3,3,2]` the reverse walk writes `2`, then
`3`, skips the older duplicate `3`, and the second pass appends `1`, giving
`[2,3,1]` as in the example.

Every query is inspected once and every window is written once, so the work
is linear in both arrays with one flag slot per window id.

**Complexity:** `O(n + m)` time, `O(n)` space.
