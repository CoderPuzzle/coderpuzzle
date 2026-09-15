# Solutions — Longest Uploaded Prefix

## Monotone pointer over uploaded marks

Videos arrive in arbitrary order, but the quantity being queried — the
longest initial run of uploaded videos — never shrinks: once every video in
`1..i` has arrived, no later upload can break that run. So there is nothing
to recompute from scratch on each `longest()` call; the first missing video
only ever moves forward.

The class keeps a boolean array `uploaded` indexed by video number, with
`upload(video)` setting its single mark, and a `prefix` pointer holding how
far the unbroken run from video 1 currently reaches. `longest()` walks the
pointer forward while the next video is already marked, then returns where
it stopped — either the end of the stream or the first gap.

Because the pointer never retreats, its total travel over the whole
interaction is at most `n`: the `while` loop never rescans a video that any
earlier call has already passed. Amortized across the at most
`2 * 10⁵` calls, `upload` is one array write and `longest` is constant, and
the mark array is the entire footprint.

**Complexity:** `O(1)` amortized time per call, `O(n)` space.
