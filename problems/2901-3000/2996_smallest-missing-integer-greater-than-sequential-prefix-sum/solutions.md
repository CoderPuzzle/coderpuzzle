# Solutions — Smallest Missing Integer Greater Than Sequential Prefix Sum

The task decomposes into two independent questions: how far the
consecutive-increasing prefix runs, and which is the first integer at or
above that prefix's sum that the array does not contain. Each is a linear
scan on its own, and they share nothing but the sum handed from the first
to the second.

## Longest sequential prefix, then walk past present values

The prefix scan keeps a running total seeded with `nums[0]` and extends it
while each element is exactly one more than its predecessor; the first
break in that progression ends the prefix, matching the definition that a
single-element prefix is already sequential. No extra state is needed —
the total is the sum of the prefix at the moment the loop stops.

The second half builds a hash set of all values so membership is constant
time, then starts a candidate `x` at the prefix sum and increments it
while the array contains `x`. The walk is short by construction: at most
`nums.length` distinct values can block any candidate, and every value is
at most 50 while the prefix sum is at most `1 + 2 + ... + 50 = 1275`, so
the answer never exceeds 1325 — far inside 32-bit range. Both scans touch
each element once, so the whole computation is two linear passes.

**Complexity:** `O(n)` time, `O(n)` space.
