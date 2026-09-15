# Solutions — Make Lexicographically Smallest Array by Swapping Elements

## Sort and Group Connected Runs

Model the values as nodes of a graph where two values are adjacent when they differ by at most `limit`; any two values in the same connected component can be swapped into each other's positions through a chain of allowed swaps. Two facts follow. Connectivity is determined by consecutive gaps alone: after sorting, a run of values whose successive differences are all `<= limit` forms one component, and any gap `> limit` permanently separates the runs on either side. And inside a component, arbitrary permutations are achievable by bubbling values along the chain, so the lexicographically smallest arrangement assigns the component's sorted values to its original positions in sorted order.

The algorithm implements exactly that. Sort the `(value, original index)` pairs by value, then partition them into maximal runs where each consecutive pair of values differs by at most `limit`. For each run, collect the original indices and sort them; write the run's values — already in ascending order from the global sort — into those indices in ascending index order. Smaller values land on smaller positions, which is optimal position by position, and every value stays inside its own component so all placements are reachable by legal swaps.

Runs are scanned with two pointers over the sorted pairs, so the whole pass is dominated by the two sorts. Duplicate values are unremarkable — they simply sit adjacent in a run — and a `limit` smaller than every gap leaves each element as its own run, returning the array unchanged.

**Complexity:** `O(n log n)` time, `O(n)` space.
