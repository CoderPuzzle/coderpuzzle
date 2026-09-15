# Solutions — Maximum Hamming Distances

## Multi-source BFS on the hypercube

Maximizing the Hamming distance from x to any array element is the same as minimizing the distance from the bitwise complement of x: HD(x, y) + HD(~x, y) = m, so answer[i] = m - minDist(~nums[i]). And minima over a set of m-bit words are shortest-path distances in the hypercube, where two vertices are adjacent when they differ in exactly one bit — every bit flip moves one Hamming step.

The code seeds a BFS with every distinct value of nums at distance 0 (duplicates collapse, they only seed the same source twice) and floods the whole 2^m-vertex cube: each dequeued vertex relaxes its m neighbors v ^ (1 << bit) whenever that improves their recorded distance. Because all edges have weight 1, the first time a vertex is reached is via a shortest path, and dist[v] ends as the minimum Hamming distance from v to the closest array element. Distances start at size + 1, an unreachable sentinel.

The final pass maps each query value through the complement: m - dist[full ^ x] is the maximum distance from x into the array, since the complement's closest element is x's farthest. With m <= 17 the cube has 131072 vertices and fits comfortably, while a per-element comparison against the whole array would be quadratic.

**Complexity:** `O(2^m · m + n)` time, `O(2^m)` space.
