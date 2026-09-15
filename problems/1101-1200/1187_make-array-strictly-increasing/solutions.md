# Solutions — Make Array Strictly Increasing

## Dynamic Programming on the Last Value

The key insight is to track, after processing a prefix of `arr1`, the set of achievable values for its final element, keyed by the minimum number of operations needed to reach that state. A state is simply "the prefix is strictly increasing and its last value is `v`". Sorting and deduplicating `arr2` first lets us find replacement candidates with binary search instead of scanning.

The DP dictionary is initialized before the first transition: keeping `arr1[0]` costs 0, and replacing it with any `arr2` value smaller than `arr1[0]` costs 1 (any larger replacement would only be worse than keeping, so it is pruned away). For each subsequent position `i`, every state `(last, ops)` forks two ways: keep `arr1[i]` when it strictly exceeds `last` at no extra cost, or replace `arr1[i]` with the smallest `arr2` value strictly greater than `last` (found via `bisect_right`) at one extra operation. Choosing the smallest valid replacement is optimal because it leaves the most room for the elements that follow.

If any round produces an empty dictionary, no strictly increasing arrangement exists and the algorithm returns -1 immediately; otherwise the answer is the minimum operation count across the final states. Writing `n` for the length of `arr1` and `m` for the number of distinct values in `arr2`, the dictionary never holds more than `m + 1` entries — one per distinct achievable last value.

**Complexity:** `O(n · m log m)` time, `O(m)` space.
