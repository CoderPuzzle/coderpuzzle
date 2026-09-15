# Solutions — Jump Game IV

## BFS on an implicit graph with value groups

Treat every index as a node in an unweighted graph: node `i` has edges to `i - 1`, `i + 1`, and every other index holding the same value `arr[i]`. The answer is the shortest path from node `0` to node `n - 1`, so plain BFS gives the minimum step count. Before the search, one pass groups indices by value into a hash map so the same-value neighbors of a node can be listed in time proportional to the group size instead of rescanning the array.

The BFS keeps a `dist` array initialized to `-1` (doubly as the visited set) and starts from index `0` with distance `0`. When a node `i` is popped, its neighbor list is `[i - 1, i + 1] + indices[arr[i]]`; each unvisited, in-bounds neighbor gets `dist[i] + 1` and joins the queue. The search returns the moment the last index is labeled, otherwise it finishes with `dist[n - 1]`.

The one performance-critical trick is clearing a value's group after it is used: `indices[arr[i]] = []`. When node `i` is expanded, every index in its group receives the same distance and becomes visited, so that group will never again produce an unvisited neighbor. Emptying it prevents an array of `5 * 10^4` identical values from re-scanning a length-`n` list from each of `n` nodes, which would be quadratic; with the clear, each index enters its group's neighbor list at most once.

The trivial edge case `n == 1` returns `0` immediately since the start is already the target. Out-of-bounds candidates `i - 1 < 0` and `i + 1 >= n` are filtered by the bounds check.

**Complexity:** `O(n)` time, `O(n)` space.
