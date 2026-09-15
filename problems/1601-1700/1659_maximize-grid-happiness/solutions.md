# Solutions — Maximize Grid Happiness

Grid happiness is a sum of purely local terms: a constant per person
placed (120 for an introvert, 40 for an extrovert) and one pairwise
charge per pair of 4-adjacent occupants. With `m, n <= 5` and at most six
people of each kind, every decision a cell's future depends on is visible
from that cell alone — the two neighbours that can already exist when the
cell is filled are the one to its left and the one above. That locality,
plus the tiny bounds, is exactly what a profile DP harvests.

## Profile DP over the row window

Fill the cells in row-major order and keep a state of (next cell, mask,
`i`, `e`), where `mask` is the ternary occupancy of the last `n` filled
cells — trit 0 is the left neighbour, trit `n - 1` the neighbour above —
and `i`, `e` are the introvert and extrovert budgets left (the trick of
Hint 3: cells earlier in the current row fold into the previous row, so
one window of `n` cells holds every neighbour a placement can touch).
Placing a person of type `v` charges its base plus, for each occupied
neighbour `u` of left and above, the pair charge for (`v`, `u`) — both
sides of the bond at once, −60 for two introverts, −10 for a mixed pair,
+40 for two extroverts — so every edge is paid exactly once, at the
moment its second endpoint appears.

Each cell step rolls the whole table forward: placing `v` shifts the mask
(`v` becomes trit 0, the oldest trit falls off), spends from the matching
budget, and relaxes the destination state. A state's value is always
non-negative — even an introvert hemmed in on all four sides nets 0 — so
−1 cleanly marks unreachable states. The answer is the maximum over the
final table, reached after at most 25 cell steps over at most 243 masks
and 49 budget pairs: small enough to run as plain nested loops in every
language here.

**Complexity:** `O(m * n * 3^n * 7 * 7)` time (row-mask DP), `O(3^n * 7 * 7)` space.
