# Solutions — Find the Longest Equal Subarray

## Bucket each value's indices and slide a window over the gaps

Whatever equal subarray finally survives, it consists of copies of one value
v sitting inside some original span, and every foreign element strictly
between its first and last kept copy must be deleted — survivors in between
would break equality otherwise. So for a fixed v with ascending occurrence
positions P[0..m-1], keeping the consecutive run P[i..j] costs exactly
(P[j] - P[i]) - (j - i): the span length minus how many copies of v it
holds. The problem reduces to maximizing j - i + 1 subject to that cost
being at most k, independently for every distinct value.

Each position list is walked once with two pointers: extend the right end,
and while the deletion cost exceeds k advance the left end. Extending the
right end can only grow or keep the cost and advancing the left end can only
shrink it (each step moves a boundary past exactly one copy), so both
pointers only move forward and the walk is linear in the list length; the
best window seen per list updates the answer. The lists come from one pass
of bucketing indices by value into a hash map, and their total length is n.
With nums.length <= 10⁵ every index distance, span length, and the answer
itself stays far inside signed 32-bit range, so plain int arithmetic is
exact throughout. The answer is never zero: an empty deletion already keeps
one element.

**Complexity:** `O(n)` time, `O(n)` space.
