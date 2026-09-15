# Solutions — Longest Balanced Subarray I

## Left-endpoint sweeps

Fix a left endpoint and stretch the right one across the rest of the array. Two sets hold the distinct even and odd values seen so far in the current window; each element that enters lands in exactly one of them, so both stay current under constant-time membership tests. Whenever the two sizes are equal the window is balanced by definition, and its length `right - left + 1` competes for the answer.

The double loop visits every subarray exactly once — at its own left endpoint, at the moment its right endpoint is reached — so no candidate is missed. Equality can break and later return as the window grows: an element of one parity widens the gap until an element of the other parity closes it again, which is why the check runs at every step instead of stopping at the first mismatch. Duplicates cost nothing — a repeated value fails its set's membership test and moves neither count, which is precisely the distinct-values rule the statement states.

With `n` at most `1500` the sweep performs at most about `n²/2 ≈ 1.1M` window extensions, comfortably inside the limits.

**Complexity:** `O(n²)` time, `O(n)` space.
