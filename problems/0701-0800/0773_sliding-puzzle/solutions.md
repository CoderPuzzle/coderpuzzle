# Solutions — Sliding Puzzle

## Breadth-first search over board states

Treat each board configuration as a node and each move (swapping the `0` with a 4-directionally adjacent tile) as an edge; BFS from the start state then finds the minimum number of moves to reach `[[1,2,3],[4,5,0]]`. Since the board has only six cells with distinct values, there are at most `6! = 720` states, so the search is tiny regardless of input.

Encode a state as a 6-tuple of the board read row-major, so states hash into a visited set. Precompute, for each of the six cell indices, which neighbor indices exist on the 2x3 board (for example, cell 0 borders cells 1 and 3) — this replaces bounds logic during expansion. The queue holds `(state, moves)` pairs; popping a state, locating its `0`, and swapping with each neighbor generates successors, which are returned immediately if they equal the target, otherwise enqueued when unvisited.

The start state is checked for equality with the target before the loop, returning 0. Half of all permutations are unreachable from the target (odd permutations), so if the queue empties without finding it, the answer is `-1`; the BFS simply exhausts the reachable component at worst.

**Complexity:** `O(N * N!)` time, `O(N!)` space for `N = 6` cells (at most 720 states with up to 4 moves each, effectively constant).
