# Solutions — Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit

## Sliding Window With Two Monotonic Deques

A subarray satisfies the condition exactly when its maximum minus its minimum is at most the limit, so the problem reduces to maintaining the extrema of a sliding window. A two-pointer window is valid here because feasibility is monotone: any subarray containing an invalid subarray is itself invalid, so the left pointer only ever needs to move forward, never backward.

The maximum and minimum are maintained with two deques of indices. The max-deque keeps indices whose values are strictly decreasing and the min-deque strictly increasing; when a new element arrives, all weaker elements at the back are popped because they can never again be the extreme while the newcomer remains in the window. The fronts of the two deques are therefore always the current window's maximum and minimum.

The right pointer advances one position at a time. While the front maximum minus the front minimum exceeds the limit, the left pointer advances, popping a deque front exactly when it is the index being evicted. After each shrink the window is again valid, and its length is compared against the best so far. Every index enters and leaves each deque at most once, so the whole pass is linear despite the nested loops.

Duplicate values are handled by popping on non-strict comparisons, which still leaves one copy of the extreme in the deque, and a single-element window is always valid since its spread is zero, so the loop can never get stuck.

Example 1 (`nums = [8,2,4,7]`, `limit = 4`) tracks both deques:

1. `right = 0` (8): the window is `[8]` with both deques holding index 0.
2. `right = 1` (2): the spread `8 - 2 = 6` exceeds the limit, so `left` advances past the 8; the window shrinks to `[2]`.
3. `right = 2` (4): the window `[2, 4]` has spread 2 and length 2.
4. `right = 3` (7): the spread `7 - 2 = 5` evicts the 2, leaving `[4, 7]` with spread 3 — the best length stays 2.

**Complexity:** `O(n)` time, `O(n)` space.
