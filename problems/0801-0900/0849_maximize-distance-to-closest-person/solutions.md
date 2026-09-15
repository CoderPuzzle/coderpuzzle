# Solutions — Maximize Distance to Closest Person

## One pass over the gaps

All that matters about the row is where its empty stretches are: the empties
before the first person, the empties between two seated people, and the
empties after the last one. Inside a stretch the best seat is fixed — an edge
stretch is entered at the row's end, where only one neighbor constrains it,
while a stretch between two people is entered at its middle — so the answer is
the largest per-stretch best, and one left-to-right pass that remembers `prev`,
the index of the previous seated person, sees each stretch exactly when it
closes.

Each seated person at index `i` closes the stretch that started after `prev`.
If `prev < 0` it was the leading stretch, whose best seat is index 0 at
distance `i`. Otherwise it is a stretch with people on both sides: the
neighbors sit `i - prev` apart, and the empty seat maximizing the smaller of
its two distances is the middle one, at distance `(i - prev) / 2` rounded
down — moving any further only feeds the nearer neighbor. When the loop ends
one stretch is still open, the trailing one, and its best seat is the far end
`n - 1`, at distance `n - 1 - prev` from the last person; `best` only ever
grows, so a final maximum against it settles that case. The constraint that at
least one person sits guarantees `prev` is a real index by then.

Example 1, `[1,0,0,0,1,0,1]`, has no edge stretches and gaps of width 4 and 2
between its people, giving 2 and 1 — so 2. Example 2, `[1,0,0,0]`, closes no
interior gap at all and answers 3 from the trailing stretch; Example 3,
`[0,1]`, answers 1 from the leading one. Every distance is an index
difference under the `2 * 10⁴` length bound, so plain machine integers carry
all of the arithmetic.

**Complexity:** `O(n)` time, `O(1)` space.
