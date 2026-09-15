# Solutions — Minimum Split Into Subarrays With GCD Greater Than One

## Greedy GCD Segments

A subarray's gcd can only decrease as the subarray grows (hint 2), and it
decreases toward whatever the newest element contributes. That monotone
shrinkage makes the split greedy: while the open block's running gcd is
still above 1, absorbing the next element is free — it never hurts — and
the moment that absorption would drive the gcd to 1, a boundary is
unavoidable there or later. Cutting exactly at the breaking element
dominates cutting anywhere earlier: an earlier cut splits off a prefix
whose gcd was still valid, and the remainder inherits a running gcd no
better than before, so no arrangement recovers the loss.

The scan carries one number — the open block's running gcd. Each element
replaces `run` with `gcd(run, value)`; if that lands on 1, increment the
block count and restart `run` at the element itself (a single element > 1
is always a valid block under the constraint `2 <= nums[i]`). This is
hint 3 verbatim, and each step is one Euclidean round-trip on values up to
`10⁹`.

Every intermediate gcd divides both operands, so nothing exceeds 32-bit
range in any language; the count of parts is bounded by n.

**Complexity:** `O(n log(max nums))` time — the extra factor is the
Euclidean steps — `O(1)` space.
