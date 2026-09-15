# Solutions — Minimum Cost Path with Teleportations

## Layered dynamic programming over teleport counts

Group routes by how many teleports they spend and solve one layer per
count. `d[t][i][j]` is the cheapest way to be standing on `(i, j)` having
used at most `t` teleports, so layer 0 is the ordinary right/down minimum
path sum with the start cell free. A later layer opens with its teleport:
from any cell whose value is at least `grid[i][j]` you may land on
`(i, j)` for free, which makes the layer's entry cost the minimum of the
previous layer over all such launch cells — including `(i, j)` itself,
since equal values are allowed.

Sorting the cells by value, descending, turns that "minimum over
everything at least as valuable" scan into one running prefix minimum:
cells sharing a value sit inside the same prefix however ties are broken,
because the comparison is `>=`. One sweep therefore produces every cell's
teleport entry cost; a single row-major pass then layers normal moves on
top, letting each landing spot flow right and down exactly as in the
plain path-sum DP. The self-candidate in the prefix makes every layer
monotone in `t`, so after `k` rounds the goal cell of the final layer is
the answer.

The sort runs once, and each of the `k` layers afterwards is two linear
passes over the grid. Any route's cost is at most `(m + n - 2) * 10^4`,
comfortably inside 32-bit range, but the fixed-width languages keep the
tables in 64-bit so the sentinel arithmetic never has to be trusted near
an overflow.

**Complexity:** `O(k · m · n · log(m · n))` time, `O(m · n)` space.
