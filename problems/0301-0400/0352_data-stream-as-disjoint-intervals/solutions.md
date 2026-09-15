# Solutions — Data Stream as Disjoint Intervals

## Maintained Sorted Interval List

The stream only ever needs to be seen as disjoint intervals, so the class
keeps exactly that and nothing more: a list of `[start, end]` pairs sorted
by `start`, with touching intervals merged the moment they touch. `addNum`
binary-searches the starts for the first interval that begins at or after
the value, which pins the only two candidates that can react — the
interval before the slot, which may already cover the value or end one
below it, and the interval at the slot, which may start one above it. A
value that touches nothing inserts as a fresh single-point interval; a
value touching one interval extends it (extending with a value the
interval already covers is a harmless no-op); a value touching two welds
them into one.

`getIntervals` then has no thinking left to do: the list is already
disjoint and sorted by construction, so it copies the pairs out as they
stand. Repairing at add time rather than summarizing at query time is
what keeps both methods this cheap — no query ever rebuilds, scans, or
sorts anything.

With at most `3 * 10⁴` calls, the cost that matters is the interval count
`k`, not the stream length: the search is `O(log k)`, and the worst repair
is a shift of the list on insert or weld, `O(k)`. A long ascending run
keeps `k` at 1 forever, and the interleaved worst case — every add
spawning its own interval, then every later add bridging — still only
moves a few hundred pairs in a value range capped at `10⁴`.

**Complexity:** `O(log k + k)` per `addNum` worst case (search plus list
shift), `O(k)` per `getIntervals`; `O(k)` space, where `k` is the number
of disjoint intervals.
