# Solutions — Count Indices With Opposite Parity

## Suffix parity counts

For every index, the answer is the number of later elements whose parity
differs from its own parity. Scan from right to left while maintaining the
counts of even and odd elements already seen. When visiting `i`, record the
opposite parity count, then add `nums[i]` to its own parity count.

The algorithm avoids checking each pair separately. A one-element array is
handled naturally because the first scan starts with zero counts. Since only
parity matters, values can be folded into even or odd before counting.

**Complexity:** `O(n)` time, `O(n)` space for the returned answer.
