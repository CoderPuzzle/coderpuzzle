# Solutions — Maximum Vacation Days

## Forward dynamic programming over weeks

Flights may be taken only on Monday morning, at most one per week, so a week
holds exactly one decision: which city to spend it in. The schedule is a
sequence of those decisions, and the only fact that carries from one Monday
to the next is the city the traveler wakes up in. That makes the week the
natural unit of state — after handling weeks `0..w-1`, `dp[city]` is the
most vacation any schedule has banked while ending that stretch in `city`.
One week's step says city `j` can close week `w` only for a traveler who
closed week `w-1` in some `i` with `i == j` (staying put, which costs no
flight) or `flights[i][j] == 1` (the single Monday hop), and such a week
banks `days[j][w]` more.

The sweep starts before week 0: the traveler sits in city 0 with nothing
banked, and every other city is marked unreachable — `-1` serves as that
mark because vacation totals are never negative. Week 0's own transition
then encodes the first Monday, so the vacatable cities of week 0 are exactly
city 0 plus the cities `flights[0][*]` reaches, matching the rule that the
traveler may fly to and start the week in another city. Each week computes
the next array from the previous one and the current `days` column, and the
answer is the largest entry after the last week; staying is always allowed,
so the start city keeps at least one schedule alive and the maximum is
well-defined.

The cost is one transition per ordered pair of cities per week — `k` weeks,
`n` destinations, `n` candidate sources — and the state rolls forward in two
length-`n` arrays.

**Complexity:** `O(k * n^2)` time, `O(n)` space.
