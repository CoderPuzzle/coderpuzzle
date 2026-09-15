# Solutions — Sliding Window Median

## Sorted Window with Binary Insertion

Instead of re-sorting each window, the solution maintains one sorted list that mirrors the sliding window. For each incoming element `insort` finds its position with binary search and inserts it; once the window is full, each step also evicts the outgoing element `nums[i - k]`, located with `bisect_left` and removed by index. Removing the leftmost occurrence of the outgoing value keeps the multiset exactly right even when values repeat, since equal elements are interchangeable.

Keeping the window sorted makes the median an index lookup rather than a search: for odd `k` it is the element at `k / 2`; for even `k` it is the mean of the elements at `k / 2 - 1` and `k / 2`, divided as a float. Medians are emitted only from index `k - 1` onward, after the eviction has already run, so the list always holds exactly the current `k` values at the moment of measurement — the transient `k + 1` state during the handoff is never observed.

The eviction uses the same leftmost-match discipline as insertion, so the window never drifts. With `k` up to the full array length and `n` up to 1e5, the per-operation cost is dominated not by the `O(log k)` binary search but by the element shifting inside the Python list, which is linear in `k`; this is still fast in practice and keeps the code far simpler than a two-heap structure, at `O(n·k)` total work with only the window itself held in memory.

**Complexity:** `O(n·k)` time, `O(k)` space.
