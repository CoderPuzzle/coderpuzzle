# Solutions — Distinct Gate Paths to LCA

The solution runs binary lifting with card-transition matrix products.

## Binary lifting matrices

Represent each node by a two-color transition matrix and store its product for every power-of-two upward jump. Binary lifting finds each LCA and composes both paths without traversing them one edge at a time.

![On the 3-node example each node carries its 2x2 transition matrix M = [[b, w], [w, r]], and for query [1, 0, 2, 0] Alice's blue row of M(1) sums to 2 while Bob's blue row of M(2) sums to 1, so 2 x 1 = 2 ways reach the LCA.](figures/solution-card-transition-matrices.svg)

The iterative preprocessing also avoids recursion on a long rooted chain. All matrix entries are reduced modulo 10⁹ + 7 after every multiplication.

**Complexity:** `O((n + q) log n)` time, `O(n log n)` space.
