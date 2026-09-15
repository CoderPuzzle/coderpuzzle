# Solutions — Maximum Enemy Forts That Can Be Captured

A legal move always runs from one non-zero cell to another with nothing
but enemy zeros between them; it captures those zeros exactly when its
two endpoints differ — a commanded `1` on one side and an empty `-1` on
the other (either order). So the whole answer lives among maximal runs
of zeros whose immediate neighbors disagree.

## One scan over previous non-zero position

Keep the index of the most recent non-zero entry while sweeping left to
right. Each time another non-zero entry appears, the run of zeros that
just ended spans exactly the cells between the two indices — capture
`i - last - 1` if and only if the endpoint values differ. Track the best
such differing span in one pass; values never exceeding `n - 1 <= 999`,
so ordinary 32-bit integers suffice everywhere.

A lone commanded fort (`1`) with no empty neighbor, matching endpoint
pairs (`1…1`, `-1…-1`), and arrays without any pair at all fall out of
the same comparison and correctly return `0`.

**Complexity:** `O(n)` time, `O(1)` extra space.
