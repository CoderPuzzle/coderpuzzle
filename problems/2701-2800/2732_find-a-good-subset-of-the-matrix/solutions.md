# Solutions — Find a Good Subset of the Matrix

## Row bit-signatures with a first-occurrence map

Because every row has at most five cells, each row collapses losslessly
into an integer bit-signature where bit `j` is `grid[i][j]`. Two rows form
a good subset of size 2 exactly when their column sums stay at most 1 —
that is, when their signatures are disjoint (`&` is zero) — and a single
row forms a good subset of size 1 exactly when its signature is zero. So
the search space over row contents shrinks from arbitrary matrices to at
most 32 distinct signatures, and everything the statement asks for can be
decided from those integers alone.

The scan walks the rows in order. A zero-signature row is answered
immediately with its own index, since it is a good subset by itself. Any
other row consults a map of already-seen signatures to their earliest index
and tests all 32 possible partner signatures: the first disjoint match ends
the scan with both indices (returned in ascending order). Recording only
the first occurrence of each signature keeps the map's key space capped at
31 entries, so the per-row probe cost is constant and independent of how
large the matrix grows.

If no zero row exists and no two stored signatures are ever disjoint, no
good subset of any size can exist, and the scan falls through to an empty
array. All values involved are tiny — masks fit in 5 bits, indices are
below `m <= 10⁴`, and there is no recursion anywhere.

**Complexity:** `O(m · 2ⁿ)` time (32 map probes per row), `O(2ⁿ)` extra
space for the signature map.
