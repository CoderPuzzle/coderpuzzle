# Solutions — Find All Possible Recipes from Given Supplies

## Topological Sort (Kahn's Algorithm)

A recipe is makeable exactly when every ingredient is either an initial supply or another recipe that is itself makeable — a dependency relation, with the wrinkle that recipes may depend on each other cyclically (in which case neither can ever be made). The solution models recipes as nodes: for each recipe `i`, any ingredient already in `supplies` is ignored, an ingredient that is neither a supply nor a recipe marks `i` as permanently impossible, and each distinct recipe dependency adds an edge `dependency → i` and increments `i`'s indegree. Duplicating an ingredient inside one recipe's list is deduplicated so it cannot double-count the indegree.

Kahn's algorithm then seeds a queue with every recipe whose indegree is zero and that is not impossible — these need nothing beyond the initial supplies. Processing a recipe appends it to the answer and decrements each dependent's indegree; a dependent enters the queue only when all of its recipe dependencies have been made. Impossible recipes are filtered out when decrementing so their failure never blocks or corrupts the rest.

Cycles never reach indegree zero, so they are dropped automatically, and any recipe depending (transitively) on a cycle keeps a positive indegree forever and is dropped too. The result is sorted before returning, purely for deterministic output. With `n` recipes and `m` total ingredient entries, building the graph touches each ingredient once and the queue pass touches each edge once, with the final sort adding `O(n log n)`.

**Complexity:** `O(m + n log n)` time, `O(m + n)` space.
