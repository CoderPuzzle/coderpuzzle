# Solutions — Minimum Operations to Transform Array into Alternating Prime

## Sieve-aided per-index fix

The constraint at each position is independent: an even index only cares
that its value becomes prime, an odd index only that its value becomes
non-prime, and increments never affect any other position. So the answer is
the sum, over indices, of the distance from `nums[i]` to the nearest valid
value at or above it — the smallest prime at least `nums[i]` for even
indices, the smallest non-prime at least `nums[i]` for odd indices.

A Sieve of Eratosthenes builds a boolean primality table up to a fixed
bound. Every `nums[i]` is at most 10⁵, and the largest prime gap below 10⁵
is well under the margin, so the next prime after any element is still
inside the table. Walking the table upward from `x` until a prime (for an
even index) or a non-prime (for an odd index) is found gives that position's
cost `next - x`, which the code adds to a running total.

The walk is cheap because it stops at the first valid value: for an odd
index the next non-prime is at most two steps away (an odd prime is followed
by an even number), and for an even index the next prime lies within the
local prime gap. The sieve itself is the dominant one-time cost.

**Complexity:** `O(B log log B + n)` time, `O(B)` space, where `B` is the
fixed sieve bound and `n` is the array length.
