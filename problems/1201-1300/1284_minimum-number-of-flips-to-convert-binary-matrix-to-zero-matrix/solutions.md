# Solutions — Minimum Number of Flips to Convert Binary Matrix to Zero Matrix

## BFS over the packed state space

The matrix has at most 9 cells, so the whole board packs into a single
9-bit integer. Each cell owns a fixed flip mask — its own bit plus its
existing neighbors' bits — and applying a flip is one XOR. Two facts make
this a shortest-path problem on a tiny graph: flips commute (order never
matters) and flipping the same cell twice cancels, so every reachable
configuration is reached by exactly the subsets of cells flipped an odd
number of times. BFS from the initial packing over the `2^(m·n)` states,
expanding by the cell masks, reaches zero in the minimum number of steps;
if the search exhausts the component without hitting zero, the answer is
`-1`.

![Packing mat = [[0,0],[0,1]] as 0001 (bits (0,0),(0,1),(1,0),(1,1)), BFS expands each state by the four cell flip masks and first reaches 0000 at depth 3 — flip (1,0), then (0,1), then (1,1).](figures/solution-bfs-flip-states.svg)

**Complexity:** `O(2^(m·n) · m·n)` time with `m, n <= 3` (at most 512
states × 9 transitions), `O(2^(m·n))` space for the seen marks.
