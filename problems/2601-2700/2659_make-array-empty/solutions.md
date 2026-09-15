# Solutions — Make Array Empty

## Fenwick Tree Simulation

Elements leave the array in increasing value order, and between two consecutive removals the front of the queue only rotates forward. The cost of removing the next-smallest element is therefore the number of still-present positions on the cyclic arc from the current front to the target: one operation for every element rotated past, plus the removal itself. The difficulty is counting that arc while positions keep disappearing, which a Fenwick tree over the original positions solves — slot `i` holds 1 while the element at index `i - 1` survives, so prefix sums count alive elements in any range.

Process indices sorted by value. For a target at position `pos` with the front at `cur`, add the alive count from `cur` to `pos` (split into `[cur, n]` and `[1, pos]` when the arc wraps), then zero out `pos`'s slot. The next front is the first surviving position after `pos`: after the removal, `prefix(pos)` alive elements sit at or before it, so the successor's rank among the `remaining` survivors is `(prefix(pos) mod remaining) + 1`, and a binary descent over the tree (`kth`) converts that rank into a position without scanning.

The sweep never materializes rotations, only counts them, so each removal does `O(log n)` Fenwick work after the initial `O(n log n)` setup and sort. The `remaining > 0` guard skips the successor lookup after the final removal.

**Complexity:** `O(n log n)` time, `O(n)` space.
