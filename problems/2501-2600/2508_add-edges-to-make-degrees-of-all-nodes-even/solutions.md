# Solutions — Add Edges to Make Degrees of All Nodes Even

## Odd-degree census with bounded repair cases

Adding one edge flips the parity of exactly its two endpoints, so `k`
additions can only repair at most `2k` odd-degree nodes. With two additions
in the budget, any graph with six or more odd nodes is immediately
impossible, zero odd nodes needs nothing, and — since the number of
odd-degree vertices in any graph is even — the whole problem collapses to
the census cases `k = 2` and `k = 4`.

For exactly two odd nodes `a` and `b`, one free edge between them finishes
the job; when `(a, b)` already exists, both must instead attach through some
fresh middle node `c` whose own edges to `a` and to `b` are both absent.
Four odd nodes force each addition to consume two of them, so the only shape
is a disjoint pairing — checked against the three possible pairings of the
odd set, succeeding the moment both pair edges are unused. Every membership
question reduces to "does this exact undirected pair already exist," so the
code stores all input edges once in a hash set keyed by their normalized
`(min, max)` form and answers each probe in constant time; one full pass
builds degrees (`O(n + E)` time, `O(E)` space), and everything after scans
only the tiny odd list.

The bounds fit trivially after that. Packets like `min · 200001 + max` peak
near `2 × 10¹⁰`, inside 64-bit keys for Java, C++ and Rust and comfortably
under JavaScript's exact `Number` ceiling of `2⁵³`; the loops touch every
node and edge once with no recursion anywhere.

**Complexity:** `O(n + E)` time, `O(E)` space.
