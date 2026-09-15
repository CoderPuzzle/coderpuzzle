# Solutions — Find Kth Largest XOR Coordinate Value

Every coordinate is scored by the XOR of the whole upper-left submatrix
ending at it, and the question is a rank query — the kth largest — over
those `m * n` scores. Computing each score from scratch is quadratic work
per coordinate, but XOR is its own inverse, so the scores obey a
two-dimensional prefix recurrence: they all fall out of one sweep, and a
sort turns the rank query into an index read.

## Prefix XOR, then sort

Write `prefix[a][b]` for the XOR of the submatrix with corners `(0, 0)` and
`(a, b)`. XOR-ing the prefixes of the cells above and to the left counts
every cell outside `(a, b)`'s rectangle an even number of times — the two
strips overlap in exactly the upper-left block, and `x ^ x = 0` wipes each
such cell out — leaving `prefix[a][b] = matrix[a][b] ^ prefix[a-1][b] ^
prefix[a][b-1] ^ prefix[a-1][b-1]`. Each coordinate value is one XOR away
from values already computed, so the whole table costs one pass over the
matrix.

The recurrence only ever reads the previous prefix row, so the sweep keeps
two rows alive: fold the running XOR of the current row (`matrix[a][0]`
through `matrix[a][b]`) into `prefix[a-1][b]` and the new row is complete —
no full table is materialized. As each value appears it joins one flat list
of all `m * n` scores; with the list sorted ascending, the kth largest is
the element `k` from the end. Sorting is the shipped selection — at the
bound of a million scores it is a fraction of the sweep's own cost, and it
makes the rank read a single index with no extra structure to maintain.

**Complexity:** `O(mn log(mn))` time, `O(mn)` space.
