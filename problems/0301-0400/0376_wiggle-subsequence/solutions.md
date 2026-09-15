# Solutions — Wiggle Subsequence

Both approaches answer one question — how long a chain of strictly
alternating steps the array can be culled into — and differ in the state
they keep while answering it. Dynamic programming tracks two running bests,
the longest alternating subsequence seen so far that ends on a rise and the
one that ends on a fall, each element extending its opposite state one
position back. Counting direction flips keeps neither best: it remembers
only the sign of the last move it kept and adds one whenever that sign
reverses, settling the same answer in two integer registers.

## Dynamic programming on the last step

An alternating subsequence is always in one of two states: its last step
rose, or its last step fell. Let `up[i]` be the length of the longest
alternating subsequence within the prefix `nums[0..i]` whose final step
rose, and `down[i]` the symmetric length for a final fall — neither state
requires its subsequence to use `nums[i]` itself, so each entry is a
best-so-far over the prefix and no earlier index ever needs revisiting.
Both states start at 1: the lone first element alternates vacuously and
may anchor the first real step in either direction.

A strict rise extends the opposite state: `up[i] = down[i - 1] + 1`. The
append is always available — should the fall-ending best end at or above
`nums[i]`, replacing its last element with `nums[i - 1]` keeps the same
fall on a smaller value, and the strict rise `nums[i - 1] < nums[i]` then
completes the extension. Nothing longer fits either: strike the final
element of any rise-ending subsequence of the prefix and a fall-ending
subsequence — possibly down to a lone element — of the shorter prefix
remains. `down[i]` keeps `down[i - 1]`: the new element can only ever join
a subsequence as its final step, and a rise into it cannot end a fall. A
strict fall is the mirror image, `down[i] = up[i - 1] + 1` with
`up[i] = up[i - 1]`, and equal neighbors are neither a rise nor a fall, so
both states simply carry forward.

Each state only ever holds its ground or grows — a step carries it forward
or lifts its opposite past it — so the running best sits in the final
entries and one pass ends at `max(up[n - 1], down[n - 1])`. The trivial
cases fall out of the initialization: a single element never enters the
loop and answers 1, an all-equal array carries both states through
untouched and answers 1, and the first strict step lifts its state to 2,
so a strictly monotone array answers 2.

**Complexity:** `O(n)` time, `O(n)` space.

## One pass, count direction flips

Everything that matters about a wiggle subsequence happens at the points
where the direction of travel changes. Walk the array and watch the sign of
each step: equal neighbors never help, because a zero difference is neither
positive nor negative and dropping duplicates loses nothing, so only strict
rises and strict falls count. Between two consecutive direction changes the
values move monotonically one way, and the answer is the first element plus
one for every change of direction — the local extrema together with the two
endpoints.

That count is optimal in both directions. A wiggle subsequence cannot keep
two interior elements of one monotone stretch, since the differences
between them would then share a sign; each stretch can contribute at most
its boundary points, so no subsequence beats the extrema. Conversely,
deleting everything between two direction changes is itself optimal: the
surviving sequence steps up into each extremum and down out of it, so its
differences strictly alternate, which shows the extrema count is attainable.

The pass keeps `count` starting at 1 for the first element and `direction`
remembering the sign of the last counted move (0 before any move). Each
strict step in a fresh direction increments `count`; a step that continues
the current direction, or equals its neighbor, changes nothing. A single
element returns 1, an all-equal array returns 1, and two distinct elements
return 2 — exactly the trivial cases the statement grants — and the whole
scan is one pass with two integer registers, which also answers the
follow-up.

**Complexity:** `O(n)` time, `O(1)` space.
