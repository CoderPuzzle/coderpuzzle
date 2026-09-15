# Solutions — Guess Number Higher or Lower

## Binary search

The oracle's answers order the entire range: every number above the
hidden pick answers `-1`, every number below it answers `1`, and only the
pick itself answers `0`. Guessing `1, 2, 3, …` in order finds the pick
too, but that spends one call per number — up to `2³¹ - 1` of them —
while the three-way reply hands each probe a full comparison's worth of
information. A range ordered around one hidden point is exactly the
shape binary search interrogates.

Bisect the inclusive range `[lo, hi] = [1, n]`: probe the midpoint, and a
`-1` answer means the midpoint sits above the pick, so the pick lives
below (`hi = mid - 1`); a `1` answer means it sits below, so the pick
lives above (`lo = mid + 1`); a `0` answer is the pick itself, returned
on the spot. Each probe discards half the remaining range, so even the
largest allowed `n` resolves in 31 calls.

The midpoint deserves its own care: `lo + (hi - lo) / 2` rather than
`(lo + hi) / 2`. On the full `[1, 2147483647]` range the sum `lo + hi`
overflows a signed 32-bit integer, wraps negative, and the search
wanders off the number line. The difference form never exceeds `hi`, so
it is safe at every width.

**Complexity:** `O(log n)` calls to `guess`, `O(1)` space.
