# Solutions — Next Closest Time

Only digits already on the clock may be reused, and at most four are
showing, so every way to redraw the four positions is one of at most
`4^4 = 256` strings. That tiny, fully bounded space makes total enumeration
the honest tool: draw, filter to real clock times, and compare — no
carry-chasing per position and no day-boundary special cases to get wrong.

## Enumerate the drawings on a wrapped day

Convert the input to minutes past midnight, then draw every
`h1 h2 m1 m2` combination from the distinct digits present. A drawing is a
real time when the hour is below 24 and the minute below 60, and each
survivor's wrapped lead over the input is `(candidate - input) mod 1440`
minutes. The answer is the survivor with the smallest positive lead.

The wrap needs no branch of its own because the search is seeded with the
input itself at a full day's lead of 1440 minutes. Any strictly later time
on the circle beats that seed; when none exists the seed wins and the same
clock time next day is returned — `11:11` comes back around to `11:11`,
and a set like `{0, 9, 5}` at `09:59`, whose only drawable hour is `00`,
wraps to `00:00`. A zero gap is the input drawn again, so it is skipped:
the seed already stands for it, no two survivors share a gap, and the
minimum is unique regardless of enumeration order.

**Complexity:** `O(1)` time, `O(1)` space — at most 256 bounded drawings
and a handful of scalars; nothing scales with any input dimension.
