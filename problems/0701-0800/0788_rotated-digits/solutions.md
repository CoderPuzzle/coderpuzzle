# Solutions — Rotated Digits

Rotation acts digit by digit, and only seven digits have an image under it:
`0`, `1`, and `8` return themselves while `2` trades with `5` and `6` trades
with `9`, leaving `3`, `4`, and `7` with no rotation at all. Whether a
candidate is good therefore reads straight off its decimal writing — no dead
digit anywhere, at least one trading digit somewhere — and the answer is the
census of `[1, n]` under that two-part test.

## Test each writing's digit sets

Each candidate is judged by peeling digits off the tail with `% 10` and
integer division by `10`, which walks the decimal writing from its last digit
to its first. A `3`, `4`, or `7` vetoes the whole number on sight — one
unrotatable digit already makes the rotated writing invalid — while a `2`,
`5`, `6`, or `9` promotes the candidate, because that digit must land
somewhere else. A veto ends the walk early, but a promotion never does: the
scan must reach the first digit, since a dead digit hiding behind an early
trader (as in `23`) still kills the number, and only a completed walk with no
veto and at least one promotion lands in the count — `2`, `5`, `6`, `9`,
`12`, `25` count, while `1`, `18`, and `10000` rotate to themselves and do
not.

The bound `n <= 10⁴` keeps every writing at five digits or fewer and the
tally under a few thousand, so the whole pass sits far inside 32-bit integers
in every language; the scan carries one counter and a few scalars, nothing
that grows with the range.

**Complexity:** `O(n·d)` time, `O(1)` space — `d` the digits per value, at
most five at this bound.
