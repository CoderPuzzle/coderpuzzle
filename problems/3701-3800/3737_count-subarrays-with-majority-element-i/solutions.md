# Solutions — Count Subarrays With Majority Element I

## Fixed-left sweep with a running count

A subarray has `target` as its majority exactly when `target` occurs strictly
more than half the time inside it — with integer counts, when twice the
number of occurrences exceeds the window's length. So enumerate every
subarray by its endpoints: fix the left endpoint, then extend the right end
one step at a time. Each extension adds a single element to the window, so
the count of `target` occurrences updates in constant time and the length is
just the index distance; no window is ever recounted from scratch.

Each window is checked immediately after its new right element is absorbed.
A length-1 window therefore qualifies precisely when that lone element equals
`target`, which is also why an array containing at least one `target` never
answers zero, while an absent `target` answers zero for every window. The
strictness matters at the boundary: a window where `target` occupies exactly
half the slots — two occurrences in a length of four, or one in a pair —
fails the check, because equal halves are not a majority.

Every qualifying window increments the total exactly once, since each
subarray is visited by one left endpoint with one right endpoint. With
`n <= 1000` there are at most about half a million windows, so the double
sweep sits far inside the limits.

**Complexity:** `O(n²)` time, `O(1)` space.
