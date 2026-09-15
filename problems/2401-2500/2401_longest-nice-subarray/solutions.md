# Solutions — Longest Nice Subarray

## Sliding window on a running OR mask

A subarray is nice exactly when no two of its elements share a set bit, which is equivalent to saying the bitwise OR of the whole window is disjoint from every member — and therefore from any candidate being added. That reframing collapses an all-pairs AND check into one test per step: a new value `v` may join the window if and only if `window_or & v == 0`.

The window is maintained by the standard two-pointer pattern. Extend the right end; while the incoming value conflicts with the current OR mask, remove elements from the left. Since each element's bits were folded in with `|`, removing one is a matter of XOR-ing it back out (`a ^ a = 0` clears exactly the bits that element contributed, and disjointness guarantees no other element shares them). After the conflict clears, OR in the new value and record the window length.

Each element enters and leaves the window at most once, so the scan is linear. Subarrays of length 1 are always nice, which the initial `best = 1` and an initially empty mask (`window_or = 0`, disjoint from everything) cover without a special case. A nice subarray can never exceed about 30 elements because each member needs at least one private bit, though the algorithm does not rely on that fact.

**Complexity:** `O(n)` time, `O(1)` space.
