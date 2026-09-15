# Solutions — Determine if a Simple Graph Exists

## Erdős–Gallai inequality scan

A degree sequence is realizable by an undirected simple graph exactly when
the Erdős–Gallai theorem says so: the degrees must sum to an even number,
and — after sorting them in non-increasing order — every cut `k` must obey
`d[1] + ... + d[k] <= k*(k-1) + min(d[i], k)` summed over the remaining
`i > k`. The left side is the total degree demand of the `k`
highest-degree vertices. The right side is everything that can supply it:
`k*(k-1)` counts the edges those vertices can form among themselves, and
each other vertex can send at most one edge to every prefix vertex, so it
contributes at most `min(d[i], k)`. An odd sum can never pair up into edges
at all. Any violated cut makes a graph impossible, and the theorem
guarantees the converse — so checking every cut is also sufficient.

Checking all `n + 1` cuts naively costs quadratic time, but prefix sums make
the prefix demands and the raw tail sums constant per cut, and the sorted
order tames the `min`: the entries exceeding `k` always form a prefix of the
sorted array, so a pointer that only moves left tracks how many of them sit
beyond the cut. Each such entry contributes exactly `k`; everything after it
contributes its own degree. The scan runs over all cuts from `0` through
`n` with 64-bit accumulators, since the degree sum reaches `10¹⁰`, and any
violated cut — or an odd sum, checked first — answers `false` immediately.

**Complexity:** `O(n log n)` time, `O(n)` space.
