# Solutions — Maximum Points Inside the Square

## Sweep outward over Chebyshev radius

A square centered at the origin with half side `D` contains exactly the
points whose Chebyshev radius `max(|x|, |y|)` is at most `D`, so ranking
points by that single number turns every achievable point set into a
prefix of the sorted order. Ties are indivisible: two points sharing the
same radius enter or leave together, which is why the sweep works on
equal-radius blocks rather than single points.

Walk the sorted blocks outward carrying one global seen-tag table.
A block is admissible only when its own tags are distinct and none of them
appeared in earlier blocks; the first inadmissible block disqualifies
every larger square as well (prefixes must pass through it), and the count
of points gathered before the block is the answer. Each point is touched a
constant number of times once sorting is done, and only two 26-slot tag
tables are ever held.

**Complexity:** `O(n log n)` time for the sort plus a linear sweep,
`O(1)` space beyond the index array (`26`-slot tables).
