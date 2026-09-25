# Solutions — Number of Operations to Make Network Connected

## Union-Find Component Counting

Connecting `n` computers into one network fundamentally requires at least `n − 1` cables, so if there are fewer connections than that the answer is immediately −1. Conversely, when enough cables exist the answer is always achievable: each connected component with `s` nodes holds at least `s − 1` cables (a spanning tree), so any cable beyond a spanning tree inside a component is spare and can be relocated to link two different components. Each relocation reduces the component count by one, so the minimum number of moves is exactly (number of components) − 1.

The implementation uses union-find with path halving (`parent[x] = parent[parent[x]]` as it climbs) to count components. It starts the counter at `n` and, for every connection whose endpoints currently have different roots, merges them and decrements the counter. Parallel work is skipped automatically: when both endpoints already share a root, that cable is redundant and nothing changes, which is precisely the spare cable the counting argument relies on.

![Hand-running union-find on n=4 with connections [[0,1],[0,2],[1,2]]: cables [0,1] and [0,2] merge components 4→3→2 while cable [1,2] finds both roots already 0 and lands as the spare, so components − 1 = 1 move rewires it to reach computer 3.](figures/solution-union-find-spare-cable.svg)

Because each union is judged only on roots, self-connected or already-connected inputs cost two finds and no state change. The final result `components − 1` is correct even for a fully connected network (0 moves) and for the trivial single-computer case.

**Complexity:** `O((n + m) · log n)` time, `O(n)` space, where `m` is the number of connections.
