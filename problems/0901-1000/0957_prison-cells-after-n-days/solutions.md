# Solutions — Prison Cells After N Days

Eight cells of two states each give at most 2⁸ = 256 possible rows, and the
first change vacates both end cells, shrinking everything that follows into
the 64 rows of the six interior cells. The daily map is deterministic, so
the sequence of rows that follows any start must eventually loop: a short
head, then a cycle it never leaves — which is the only way `10⁹` days can
be answered without `10⁹` steps.

## Seen-state cycle jumping

Hash every state to the day it first appears and simulate day by day. The
state space is finite, so the current state soon becomes one already in the
map — say it first appeared on day `first` and has just reappeared on day
`day`. Those `day - first` transitions form a cycle the future repeats
exactly, so the row on day `n` is the row on day `day + (n - day) % (day -
first)`. Compute that remainder and simulate only those extra transitions.

For this rule no start needs more than fifteen days to start repeating: the
head is at most one day (occupied end cells die immediately) and the cycles
that follow have lengths 1, 7, or 14 only. The fixed point is
`[0,0,1,0,0,1,0,0]`, where every interior cell's neighbors match exactly
where the cell is occupied — and even the all-vacant row keeps moving,
because its vacant neighbors match and the whole interior lights up on day
1, settling onto a 7-day cycle. So a billion days cost fewer than thirty
transitions.

**Complexity:** `O(256)` time, `O(1)` space.
