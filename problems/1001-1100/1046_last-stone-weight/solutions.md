# Solutions — Last Stone Weight

## Max-Heap Simulation

The game is fully deterministic: every turn must take the two heaviest stones, so the only data-structure need is fast access to the current maximum. A binary max-heap provides exactly that. Since Python's `heapq` is a min-heap, the code stores negated weights so the smallest negated value corresponds to the heaviest stone.

After heapifying all stones in one pass, the loop pops the two heaviest stones y and x (restored to positive by negation). If they differ, the leftover fragment y - x is pushed back as its negation; if they are equal, both stones vanish and nothing is pushed. The loop stops when at most one stone remains, and the answer is that stone's weight, or 0 when the heap emptied entirely — which happens exactly when the stones pair off into equal smashings.

Edge cases: a single input stone never enters the loop and is returned as is; an even count of equal stones can annihilate to an empty heap, caught by the final `if heap` check. Each of the n - 1 rounds does O(log n) heap work.

**Complexity:** `O(n log n)` time, `O(n)` space.
