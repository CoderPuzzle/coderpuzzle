# Solutions — Pyramid Transition Matrix

A block may sit on a pair only when some pattern in `allowed` names that
pair and that top letter, so the whole question is which complete rows can
appear above the given bottom row. The solution carries exactly that state
— the set of rows still alive — and sweeps the pyramid one level at a
time.

## Level-by-Level Sweep of Alive Rows

Compress `allowed` into one lookup first: for each ordered pair of letters
`(a, b)`, a bitmask of the letters that may be stacked on it. One pass over
`allowed` sets one bit per pattern, and a pair whose mask stays empty is a
dead end — nothing may ever be stacked on it. The bitmask keeps each
position's candidates cheap to walk: six bits, one per letter.

The state swept between levels has to be a whole concrete row, not a table
of per-position letter sets. Two adjacent positions on the row above share
the middle block beneath them, so the letter reachable at one position can
rule out the letter reachable at its neighbor; per-position sets drop that
coupling and can bless a pyramid that cannot actually be built. Keeping
whole rows preserves it: a row above exists only when one concrete row
below, the same one at every position, lifts to it.

The sweep starts from the single row `bottom`. Each alive row is lifted one
level: position `i` of the row above takes any letter in the mask of the
pair `(row[i], row[i+1])`, a zero mask discards the row outright, and the
cartesian product of the masks enumerates every row that may sit on it.
Collecting those products in a set deduplicates across different rows
below — two of them can lift to the same row above — which is what keeps
the frontier from multiplying. An empty set ends the sweep with `false`;
arriving at a non-empty set of one-letter rows means the apex exists.

**Complexity:** `O(n·|Σ|²ⁿ)` time, `O(|Σ|ⁿ)` space.
