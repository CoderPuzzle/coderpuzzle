# Solutions — Sort Array by Moving Items to Empty Space

## Cycle Decomposition of the Target Permutation

A move takes the item sitting on the empty slot's target... rather, it swaps the empty space with any item, so sorting is a permutation-to-permutation puzzle where one "blank" token is available as a free hand. There are exactly two sorted layouts — `[1,2,...,n-1,0]` with the blank last and `[0,1,...,n-1]` with the blank first — so the answer is the minimum over the two goals.

For a fixed goal, build `sigma` where `sigma[i]` is the destination slot of the item currently at slot `i`, then decompose this permutation into cycles by following `i -> sigma[i]`. Each cycle's cost depends on whether it contains the blank. A cycle _with_ the blank is solved by `length - 1` moves: each move places one item directly into the hole the blank currently occupies, walking the blank around the cycle until it lands on its final slot. A cycle _without_ the blank of length `L >= 2` costs `L + 1`: one extra move to pull the blank into the cycle (displacing some item to the blank's own final slot) plus the `L` in-cycle placements, one of which returns the stranded item. Length-1 cycles cost nothing — those items are already home, and a lone blank on its goal slot is free too.

![The example array 4, 2, 0, 3, 1 resolved in three moves: item 2 fills the blank in slot 2, item 1 fills the blank in slot 1, item 4 fills the blank in slot 4 — one move per member of the blank's length-4 cycle besides the blank itself.](figures/solution-cycle-walk.svg)

The code builds both target arrays (`[n-1] + range(n-1)` and the identity), runs the same visited-array cycle walk for each, and returns the smaller total. Each pass touches every slot a constant number of times, so the whole computation is linear with a small constant (two passes).

The classic pitfall is forgetting the second layout: an array like `[4,2,0,3,1]` is expensive for one goal but cheap for the other, and only comparing both guarantees the minimum.

**Complexity:** `O(n)` time, `O(n)` space.
