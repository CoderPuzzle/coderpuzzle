# Solutions — Alternating Groups III

Recounting groups by scanning the circle after every repaint is far too slow
for `n` and the query count at `5 * 10⁴` each, and no summary of arbitrary
windows survives a recolor. The fix is to track the circle at edge
granularity, where one repaint touches only two edges and each counting query
becomes pure arithmetic over run lengths.

## Count good-edge runs with two Fenwick trees

Call the edge joining tile `j` with tile `j + 1` bad when both endpoints share
a color. A size-k group starting at tile `s` covers exactly the `k - 1`
consecutive edges `s .. s + k - 2`, so it alternates precisely when none of
those edges is bad — the answer for k counts the starting edges followed by
`k - 1` good ones. Between consecutive bad edges the circle contributes a
maximal run of g good edges hosting `g - (k - 1) + 1` such starts when
`g >= k - 1`, so with the multiset of run lengths known, the count is the sum
of runs of at least `k - 1` minus `k - 2` times their count; if no bad edge
exists every one of the n starting tiles works.

Flipping one tile toggles only the two edges incident to it. An edge turning
bad splits its run into two; an edge turning good merges its two neighbors
into one, with the empty and fully-alternating states handled explicitly.
An ordered set of bad-edge positions supplies each affected run's extent; the
multiset itself is two Fenwick trees keyed by length, one counting runs and
one summing lengths, so both threshold aggregates are prefix queries.

**Complexity:** `O((n+q)·log n)` time, `O(n)` space.
