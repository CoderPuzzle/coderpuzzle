# Solutions — The Knight’s Tour

## Warnsdorff heuristic with backtracking

Backtracking alone finds a tour, but boards like 5×5 have enough branching
that a chronological search wastes time re-exploring dead prefixes. Warnsdorff's
rule orders the frontier instead: from the current square, visit the candidate
square whose own onward move count is smallest. Corners and near-dead cells get
consumed early, which is exactly what a Hamiltonian path needs — leaving a
degree-1 cell for later is how tours die.

The search keeps the standard backtracking safety net: every candidate is tried
in Warnsdorff order, a square is unmarked when its subtree fails, and the first
complete `m * n`-step ordering is returned. With the heuristic ordering, the
net is almost never exercised on boards up to 5×5, but it guarantees termination
with a valid tour whenever one exists from `(r, c)`.

**Complexity:** `O(8^(m·n))` worst-case time with plain backtracking, in
practice near-linear (`O(m·n · 8 log 8)`) under Warnsdorff ordering; `O(m·n)`
space for the board.
