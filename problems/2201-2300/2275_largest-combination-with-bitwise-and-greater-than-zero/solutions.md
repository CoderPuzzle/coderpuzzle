# Solutions — Largest Combination With Bitwise AND Greater Than Zero

## Count candidates per bit position

A combination ANDs to something positive exactly when one bit position is set in every member. Fixing a bit makes this decidable cheaply in both directions: the candidates carrying that bit form a combination whose AND still has it, while any positive-AND combination must owe its positivity to some bit all of its members carry — so its size can never beat that bit's crowd. The answer is therefore just the widest crowd.

![For candidates [16,17,71,62,12,24,14] drawn as aligned bit rows, the bit 4 column carries 16, 17, 62, and 24 — four candidates — and the widest per-column count, 4, is the answer.](figures/solution-bit-column-counts.svg)

The code never builds a combination. It walks `candidates` once, adding 1 to a counter for every set bit (values stop below 2²⁴, so 24 counters suffice), then reports the largest counter.

**Complexity:** `O(n * B)` time and `O(B)` space, where `B` is the number of bit positions scanned (`B = 24`).
