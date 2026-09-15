# Solutions — Sort Array Using Prefix Reversals

## Permutation BFS

The state space has at most `8!` permutations, so a breadth-first search over
actual arrays is small. Start from the input and apply every allowed prefix
reversal from `pre` as a unit-cost edge.

The first time the sorted permutation is popped, its distance is the answer.
If the queue empties first, sorting is impossible.

**Complexity:** `O(n! * n * |pre|)` time, `O(n!)` space.
