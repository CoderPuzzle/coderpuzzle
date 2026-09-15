# Solutions — Partition String

## Greedy Novel-Segment Construction

The procedure admits no choices — at every index the current segment grows
until it is brand new, then it is emitted — so the task is a direct
simulation, and the only design decision is the structure that answers
"has this segment been created before?". A hash set of the emitted
segments answers it in expected constant time per check.

The simulation walks `s` once with a window `s[start..stop]`. Each step
extends the window by one character and looks the candidate up in `seen`;
on a miss the candidate becomes the next segment, it is recorded in
`seen`, and `start` jumps to `stop` so a fresh segment begins at the next
index. Because a segment is emitted the first moment it is unique, every
emitted segment is distinct by construction. When the string ends while
the growing candidate is still seen, the loop simply finishes without
emitting it — Example 2's trailing `"a"` — so the segments are the greedy
unique prefixes, not necessarily a full cover of `s`.

The work is bounded by the total number of characters ever compared, and
each candidate lookup or slice costs its own length. A segment of length
`L` therefore costs about `L²/2` across its failed extensions, and the
worst case is a single-letter run, where segment lengths grow `1, 2, 3, …`
up to about `√(2n)` — roughly `O(n·√n)` character work at `n = 10⁵`, a few
tens of millions of byte comparisons inside the time budget.

**Complexity:** `O(n·√n)` time worst case (`O(n)` expected for typical
inputs), `O(n)` space for the seen set and output.
