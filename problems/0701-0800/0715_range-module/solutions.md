# Solutions — Range Module

## Canonical Disjoint Intervals with Binary-Searched Splicing

The tracked set at any moment is a union of half-open intervals, and the
operations never need it in any other shape: an `addRange` merges with
everything it overlaps or touches, a `removeRange` carves a hole. The
`RangeModule` class stores exactly that **canonical form** — parallel
`starts`/`ends` arrays of disjoint, gap-separated intervals sorted by start —
so no bookkeeping ever has to re-normalize the structure.

`addRange` locates the contiguous run of intervals overlapping or touching
`[left, right)` with two binary searches: the first interval whose end is at
least `left`, and the first whose start is beyond `right`. The run plus the
new interval collapse into their hull with one splice. Including touching
intervals in the run is what keeps the form gap-separated — `[1,3)` followed
by an add of `[3,5)` becomes `[1,5)`, never two adjacent pieces.
`removeRange` finds the strictly overlapping run (ends after `left`, starts
before `right` — touching intervals are untouched, since removing `[14,16)`
must not disturb the `16` in `[16, 17)`) and replaces it with at most two
fragments: the clipped left part of the first overlapped interval and the
clipped right part of the last.

Because the form is canonical, `queryRange` is a containment test in a
**single** interval: binary-search for the last interval starting at or
before `left` and check whether its end reaches `right`. Two pieces meeting
exactly at `left`/`right` boundaries can never make a query pass falsely —
the canonical form would have merged them.

Both the Python and Java canonical solutions implement exactly this
structure (`bisect` splices; `ArrayList` with `lowerBound`/`upperBound`
helpers and `subList` clearing). With at most `10⁴` calls over values up to
`10⁹`, updates cost a logarithmic search plus a linear splice and queries
cost a single search — far inside the limits.

**Complexity:** `O(log n)` per `queryRange`; `O(log n + n)` per
`addRange`/`removeRange` (list splice); `O(n)` space for `n` tracked
intervals.
