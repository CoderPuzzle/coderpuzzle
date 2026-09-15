# Solutions — How Many Numbers Are Smaller Than the Current Number

## Approach: Counting prefix sums

Values are bounded by 100, so one pass builds a 101-slot count table. The
number of elements strictly smaller than `v` is exactly the number of
occurrences of all values below `v` — a prefix sum of that table. A second
pass over `nums` therefore answers each position with a table lookup after a
single O(101) pre-pass turns counts into cumulative totals, avoiding both the
O(n^2) pairwise comparison and any sort.

**Complexity:** `O(n + V)` time for `n` numbers and value bound `V = 100`,
`O(V)` space beyond the output.
