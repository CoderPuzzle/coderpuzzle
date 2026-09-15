# Solutions — Path with Maximum Gold

## Backtracking from every gold cell

A path may start anywhere there is gold, so the search tries each gold cell as
a start in turn. From a cell it walks to each of the four orthogonal
neighbors that holds gold and is not yet on the path, collecting as it goes.

The visited set is the gold itself: on entering a cell the code zeroes it, and
on leaving it restores the original value. That makes "not yet on the path"
and "never visit a cell with 0 gold" the same test — a zeroed cell is either
empty or currently occupied by the path — with no separate visited structure.

Recursion depth is bounded by the number of gold cells (at most 25), far
under any stack limit, so plain recursion is safe. The best total seen at any
point is the answer; an empty mine yields 0.

**Complexity:** `O(g * 3^g)` time in the worst case for `g <= 25` gold cells
(each step has at most 3 unvisited directions), `O(g)` space for the
recursion.
