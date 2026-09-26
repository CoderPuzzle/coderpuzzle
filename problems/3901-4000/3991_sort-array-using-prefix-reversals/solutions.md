# Solutions — Sort Array Using Prefix Reversals

## Permutation BFS

The state space has at most `8!` permutations, so a breadth-first search over
actual arrays is small. Start from the input and apply every allowed prefix
reversal from `pre` as a unit-cost edge.

![The BFS over all six permutations of nums=[2,0,1] with pre=[2,3], edges labeled rev 2 / rev 3, reaches sorted [0,1,2] at distance 2 via reverse 3 then reverse 2.](figures/solution-permutation-bfs-layers.svg)

The first time the sorted permutation is popped, its distance is the answer.
If the queue empties first, sorting is impossible.

**Complexity:** `O(n! * n * |pre|)` time, `O(n!)` space.
