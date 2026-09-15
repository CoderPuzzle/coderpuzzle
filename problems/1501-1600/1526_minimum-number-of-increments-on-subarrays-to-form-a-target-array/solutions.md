# Solutions — Minimum Number of Increments on Subarrays to Form a Target Array

## Greedy Difference Sum

Since every operation increments a contiguous subarray, each operation corresponds to one "layer" of the final array. The first `target[0]` operations must each span index 0, so they cost `target[0]` no matter what. After that, an operation can extend past index `i` only if it was already needed at index `i - 1`; in other words, the height of the profile can only rise where a new operation starts.

Scan left to right and pay only for rises: initialize the answer with `target[0]`, then add `target[i] - target[i - 1]` whenever that difference is positive. Descents (and flats) cost nothing, because the operations that built the earlier, taller neighbor can simply be chosen to end before index `i` — shrinking a prefix of layers is free. The sum of all positive rises plus the first element exactly counts the minimum number of horizontal strips whose union is the target profile.

This is optimal because each rise of `d` at position `i` requires `d` distinct operations that begin exactly at `i`, and the counting above never reuses an operation across two disjoint rises; conversely the strip decomposition shows the count is achievable. A single-value array (`n = 1`) degenerates to just `target[0]`, and a non-increasing array costs only its first element.

**Complexity:** `O(n)` time, `O(1)` space.
