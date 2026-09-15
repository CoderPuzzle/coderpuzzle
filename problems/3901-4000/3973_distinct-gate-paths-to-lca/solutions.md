# Solutions — Distinct Gate Paths to LCA

The solution runs binary lifting with card-transition matrix products.

## Binary lifting matrices

Represent each node by a two-color transition matrix and store its product for every power-of-two upward jump. Binary lifting finds each LCA and composes both paths without traversing them one edge at a time.

The iterative preprocessing also avoids recursion on a long rooted chain. All matrix entries are reduced modulo 10⁹ + 7 after every multiplication.

**Complexity:** `O((n + q) log n)` time, `O(n log n)` space.
