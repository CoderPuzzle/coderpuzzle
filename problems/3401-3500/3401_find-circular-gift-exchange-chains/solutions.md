# Solutions — Find Circular Gift Exchange Chains

The table is a pile of directed gift edges, and a circular chain is a
loop in it: a set of exchanges that hands every member exactly one gift
to give and exactly one to receive, closing back on itself. Two questions
decide the whole answer — which employees can be loop members at all, and
how to gather each loop's length and total value once the candidates are
known.

## Filter by exchange counts, then walk each loop

Membership first. An employee on a continuous loop gives exactly one gift
and receives exactly one gift over the whole table, so intersecting the
`giver_id`s that appear once with the `receiver_id`s that appear once
names the only possible loop members — anyone giving twice, receiving
twice, or standing at a dead end drops out, and with them every row that
touches a non-member. What survives is exactly the loops.

Reading each loop off the survivors is a closure. Starting from every
surviving row, a recursive walk follows the chain edge-to-edge, carrying
three accumulators: the gift total, the step count, and `low`, the
smallest employee id passed so far. The walk expands only while its head
differs from its start, so it halts precisely when the loop closes — a
row count and total arrive per starting member, and broken paths simply
run out of edges and never report. Grouping the closed walks by `low`
collapses each loop's members into one row (every walk around the same
loop sees the same length, total, and minimum id), which yields
`chain_length` and `total_gift_value` directly.

Numbering is presentation: `ROW_NUMBER()` over `chain_length DESC,
total_gift_value DESC, low ASC` assigns `chain_id` 1, 2, ... in the
required order, with the smallest member id settling the tie the
statement's two sort keys cannot. The trailing `ORDER BY chain_id` lays
the rows out readably, though the judge compares them as an unordered
multiset. The walk is the cost center: a loop of length `L` is traced
from all `L` of its members, so over `N` rows the query emits at most
`N²` walk rows — quadratic in the worst case of one giant loop, and
linear in the common case of many short ones.

**Complexity:** `O(N²)` time and `O(N²)` space worst case for `N` gift
rows (a single loop of `N` employees), `O(N)` for tables of short loops.
