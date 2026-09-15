# Solutions — Maximum Subarray With Equal Products

With `n` at most 100 and every element at most 10, every candidate subarray
can simply be visited — the question is only how to test
`prod == lcm * gcd` cheaply while extending a window.

## Capped running product, GCD, and LCM

Anchor each subarray at its left endpoint and walk the right endpoint
forward, carrying three running values: the product, the GCD, and the LCM
(both update in O(1) — `gcd(g, x)` and `lcm(m, x) = m * x / gcd(m, x)`).
Whenever the three agree, the window length becomes an answer candidate.

The product is the only value that can explode, and it never has to:
elements are at most 10, so every LCM divides 2520 and every GCD is at most
10, capping `lcm * gcd` at 25200. Multiplying by elements that are at least
1 never shrinks the product, so the moment it exceeds 25200 it can never
again equal `lcm * gcd` for any extension of this window — the inner walk
breaks, keeping every intermediate comfortably inside 32-bit range. Two
adjacent elements always satisfy the identity (`lcm(a,b) * gcd(a,b) = a*b`
exactly), so with `n >= 2` the answer is never below 2.

**Complexity:** `O(n²)` time in the worst case, `O(1)` extra space.
