# Solutions — Maximum Weight in Two Bags

## Reachable-capacity bitset sweep

The two bags cannot share one knapsack: merging their capacities would let a
single bag quietly exceed its own limit, and the best total depends on how a
sum splits between them. So track the pair of used capacities instead —
state `(i, j)` is reachable when some subset of the items processed so far
fills bag 1 to exactly `i` and bag 2 to exactly `j`. Every item offers each
reachable state three moves: leave the item out, spend `w` more of bag 1
when `i + w <= w1`, or spend `w` more of bag 2 when `j + w <= w2`. The answer
is the largest `i + j` over all reachable states.

Bit-parallelism collapses the bag-2 axis: row `i` is one wide integer whose
bit `j` marks state `(i, j)` reachable. Placing the current item in bag 2
shifts a whole row left by `w`, trimmed by a mask to the `w2 + 1` legal
occupancies; placing it in bag 1 ORs row `i - w` into row `i`, swept with
`i` descending so the merge reads only pre-item rows. The shifts are staged
from the pre-item rows first, then the descending merge runs, then the staged
shifts fold in — that ordering sources all three moves from the previous
item's state set alone, so no item is ever spent twice.

Reading off the answer needs only each row's highest set bit: for a fixed
bag-1 occupancy `i`, the best partner is the largest reachable `j`. Whole
blocks of states move per machine word, so the sweep costs a word-level pass
per row per item rather than the `w1 * w2`-cell loop a boolean grid needs;
packing nothing is just an empty scan that returns 0.

**Complexity:** `O(n · w1 · w2 / 64)` time, `O(w1 · w2 / 64)` space.
