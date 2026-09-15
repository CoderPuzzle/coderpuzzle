# Solutions — 3Sum With Multiplicity

## Counting value pairs and their multiplicities

The condition `i < j < k` makes the count blind to order: all that matters
is how many index triples pick which values. Since `0 <= arr[i] <= 100`, at
most 101 distinct values exist, so one pass builds a count map from value to
occurrences — that pass is the only `O(n)` work — and everything after it
operates on the map, never the array.

Enumerate pairs of values `(a, b)` with `a <= b` over the sorted distinct
values and derive the third as `c = target - a - b`, accepting it only when
`c >= b`: the sorted triple `(a, b, c)` is then the sole representative of
its multiset, so nothing is counted twice. The number of index triples
realizing it follows from which of the three coincide: `C(ca, 3)` when
`a == b == c`; `C(ca, 2) · cc` when `a == b < c`; `ca · C(cb, 2)` when
`a < b == c`; and the product `ca · cb · cc` when all three differ, with
`C(n, 2) = n(n-1)/2` and `C(n, 3) = n(n-1)(n-2)/6`. Example 2 prices its
single multiset `{1, 2, 2}` as `2 · C(4, 2) = 2 · 6 = 12`.

Raw counts leave 32-bit range long before the array bound: 3000 equal
values already carry `C(3000, 3) = 4,495,501,000` triples. Each term is
therefore computed in 64-bit width and reduced modulo `10^9 + 7` as it is
added — never after — so the running total stays below the modulus. The
pair loop performs at most `C(101, 2) + 101 = 5151` iterations with O(1)
map work each, over the `d` distinct values actually present.

**Complexity:** `O(n + d²)` time, `O(d)` space.
