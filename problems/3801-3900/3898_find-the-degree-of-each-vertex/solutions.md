# Solutions — Find the Degree of Each Vertex

An adjacency matrix already records every neighbor of each vertex in one row,
so the degree can be read directly without constructing another graph
representation.

## Sum each row

For vertex `i`, every `1` in row `i` represents one incident edge, while every
`0` represents no edge. Summing that row therefore gives the degree of vertex
`i`. The zero diagonal ensures that no vertex contributes a nonexistent
self-edge, and symmetry does not cause double counting because each output
position is computed from only its own row.

Scan all `n` rows and append each row sum to the result. The matrix itself has
`n²` entries, every degree is at most `n - 1`, and the only additional storage
is the returned array.

**Complexity:** `O(n²)` time, `O(n)` space for the output.
