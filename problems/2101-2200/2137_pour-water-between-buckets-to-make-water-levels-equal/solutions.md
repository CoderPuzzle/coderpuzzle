# Solutions — Pour Water Between Buckets to Make Water Levels Equal

## Binary search the common level

For a candidate level, sum the deficit of buckets below it and the surplus of buckets above it. Only `(100 - loss)%` of the surplus survives pouring, so the level is feasible exactly when the retained surplus covers the deficit.

Feasibility is monotone: lowering the target reduces the deficit and increases the surplus. Binary-search from zero through the largest initial bucket value for a fixed number of iterations.

**Complexity:** `O(n log(10⁵ / ε))` time and `O(1)` auxiliary space.
