# Solutions — Get Equal Substrings Within Budget

## Sliding window over the cost differences

Rewrite the question in terms of the per-character costs `cost[i] = |s[i] - t[i]|`. Changing a substring of length `len` costs the sum of `cost` over its positions, so the problem becomes: find the longest subarray of `cost` whose sum is at most `maxCost`. A sliding window finds it in one pass.

Maintain a window `[left, right)` that is always valid — its total cost never exceeds `maxCost`. Grow the right end one position at a time, adding the new cost; if the window becomes too expensive, shrink from the left, subtracting costs until it is affordable again. Because every step only adds a non-negative cost and removes costs from the front, the window never misses a longer valid subarray: whenever the right pointer sits at a position, the window is the longest valid one ending there.

The length of the longest window seen over the whole pass is the answer. All costs are non-negative, so a window that is valid stays valid when shrunk, which is exactly what makes the linear scan correct.

**Complexity:** `O(n)` time, `O(n)` space (for the cost array; an on-the-fly variant is `O(1)` space).
