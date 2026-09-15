# Solutions — Minimum Number of Operations to Satisfy Conditions

## Column-wise DP over the ten digits

The vertical rule chains every cell in a column into one equality class, so
an optimal final grid makes each column a single constant — and changing a
column to value `v` costs exactly `m` minus how many cells already hold `v`.
The horizontal rule then couples only neighbouring columns: consecutive
constants must differ. The matrix problem collapses to picking a digit
`v_j` for every column so that `v_j != v_j + 1` while minimizing the total
column-change cost. Restricting candidates to the ten digits cells can hold
loses nothing: a column assigned some other number misses all `m` cells,
while any digit present in it costs strictly less and at most two neighbours
can forbid two of the ten choices, so an optimal assignment always exists
inside the domain.

Scan the columns left to right keeping `dp[v]` = minimum operations spent on
processed columns if the last column took value `v`. For the next column,
`new_dp[u] = (m − count_u) + min{dp[v] : v ≠ u}`, where `count_u` is how
many cells of that column already equal `u` — counting the whole grid up
front keeps each step's transition a fixed 10×10 sweep. The first column is
seeded from its raw per-digit change costs (`dp[v] = m − count_v`, no
predecessor), and the answer is the smallest `dp` entry after the last
column.

**Complexity:** `O(m·n + n·10²)` time, `O(1)` extra space.
