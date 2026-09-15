# Solutions — Movement of Robots

## Collision Pass-Through with Sorted Prefix Sums

Collisions only exchange the robots' identities: two bodies bouncing off each other leave exactly the same multiset of positions as two bodies walking straight through one another, and since the problem asks only for pairwise distances — not which robot sits where — the bounces can be ignored entirely. After `d` seconds the positions are simply `x + d` for every robot commanded `'R'` and `x - d` for every `'L'`.

The sum of pairwise distances of a sorted list is a one-pass prefix computation: for each index `i`, the pairs with all earlier robots contribute `pos[i] * i - prefix`, where `prefix` is the sum of the positions before `i`. Accumulating that term across the sorted order counts each unordered pair exactly once.

The code generates the shifted positions with a comprehension, sorts them, and runs the sweep. Coordinates reach `3 * 10^9` and pair sums scale with `n`, so intermediate totals grow beyond 64 bits; Python integers absorb that exactly, and the total is reduced modulo `10^9 + 7` only at the very end, which is valid because only the final residue is requested.

**Complexity:** `O(n log n)` time, `O(n)` space.
