# Solutions — Minimum Domino Rotations For Equal Row

## Candidate values from the first domino

Every domino has only two faces, so for a value `v` to end up filling an
entire row, the very first domino must already carry `v` on one of its
two faces — otherwise no rotation could ever bring `v` there. That
narrows the search to at most two candidates: `tops[0]` and `bottoms[0]`.

For a candidate `v`, one pass over every domino decides feasibility and
cost: if neither face of some domino equals `v`, `v` can never fill a
row and the candidate is rejected. Otherwise two counters accumulate —
one counting how many dominoes still need a rotation to bring `v` onto
the top row, the other counting how many need a rotation to bring `v`
onto the bottom row — and the cheaper of the two totals is the rotation
count for making that row uniform under `v`. The overall answer is the
smaller such count over both candidates, tried in turn, or `-1` if
neither candidate survives the pass.

**Complexity:** `O(n)` time, `O(1)` space, where `n` is the number of
dominoes.
