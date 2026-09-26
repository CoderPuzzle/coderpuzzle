# Solutions — Detonate the Maximum Bombs

## Search the directed reachability graph

Create a directed edge from bomb `i` to bomb `j` when the squared distance between their centers is at most the square of bomb `i`'s radius. Squared 64-bit arithmetic avoids floating-point comparisons and overflow.

Run a graph search from every possible initial bomb and retain the largest number of reached vertices.

![On the five-bomb example, the directed edges 0→1, 0→2, 2→1, 2→3, 3→1, 3→2, 3→4, 4→2, 4→3 let a DFS from bomb 0 follow 0→1, 0→2, 2→3, 3→4 and detonate all 5.](figures/solution-dfs-reachability.svg)

**Complexity:** `O(n³)` time and `O(n²)` space.
