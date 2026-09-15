# Solutions — Number of Alternating XOR Partitions

## Prefix-XOR DP over split points, bucketed by value

A partition is a chain of cut points 0 = c0 < c1 < … < ck = n, and because
blocks are contiguous, the XOR of a block is a difference of prefix XORs:
the block between cuts cj-1 and cj XORs to P[cj] ^ P[cj-1], where P[i] is
the XOR of the first i elements. So a block ending at position i XORs to
target1 exactly when it starts after a position j with P[j] = P[i] ^ target1.
Track two counts per position: the valid partitions of the prefix whose last
block XORed to target1 (odd block count) and those whose last block XORed to
target2 (even count). A target1 block ending at i continues, at each such j,
a partition that ended on target2 — or the empty start before position 0 —
and the target2 case is symmetric, reading only partitions that ended on
target1. The empty start feeds the target1 side alone, because the very
first block must XOR to target1.

Scanning every earlier j at every i would be quadratic, so aggregate by
value instead: two bucket tables indexed by prefix value hold the running
totals of ended-on-target1 and ended-on-target2 partitions, with the empty
start pre-loaded into the target2-side bucket at value 0. Sweeping i from
left to right with a running prefix XOR p, each step reads the two cells at
p ^ target1 and p ^ target2, producing the two fresh counts for position i,
and then adds them into the cell at p. The answer is the sum of the two
counts produced at position n, since the alternation may stop after either
a target1 or a target2 block.

Every nums[i] and both targets are at most 10⁵ < 2¹⁷, and XOR never widens
a value, so every prefix XOR and every bucket key lies in [0, 2¹⁷): the
tables have 131072 cells. Counts are reduced modulo 10⁹ + 7 at every bucket
write, so each stored count stays below 10⁹ + 7 and any pre-reduction sum
stays below 2³¹; the fixed-width languages keep the cells in 64-bit
integers regardless and return the final sum reduced, while JavaScript's
doubles hold every integer involved exactly, far inside 2⁵³.

**Complexity:** `O(n + 2¹⁷)` time, `O(2¹⁷)` space.
