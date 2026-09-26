# Solutions — The Knight’s Tour

## Warnsdorff heuristic with backtracking

Backtracking alone finds a tour, but boards like 5×5 have enough branching
that a chronological search wastes time re-exploring dead prefixes. Warnsdorff's
rule orders the frontier instead: from the current square, visit the candidate
square whose own onward move count is smallest. Corners and near-dead cells get
consumed early, which is exactly what a Hamiltonian path needs — leaving a
degree-1 cell for later is how tours die.

![On the 3x4 board from (0,0), the completed tour is numbered 0..11 with
knight-move arrows; at junction (0,1) Warnsdorff takes (1,3) with 1 onward
move over (2,2) with 2.](figures/solution-warnsdorff-onward-counts.svg)

The search keeps the standard backtracking safety net: every candidate is tried
in Warnsdorff order, a square is unmarked when its subtree fails, and the first
complete `m * n`-step ordering is returned. With the heuristic ordering, the
net is almost never exercised on boards up to 5×5, but it guarantees termination
with a valid tour whenever one exists from `(r, c)`.

**Complexity:** `O(8^(m·n))` worst-case time with plain backtracking, in
practice near-linear (`O(m·n · 8 log 8)`) under Warnsdorff ordering; `O(m·n)`
space for the board.
