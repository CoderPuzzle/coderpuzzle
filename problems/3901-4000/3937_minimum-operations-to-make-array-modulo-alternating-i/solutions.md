# Solutions — Minimum Operations to Make Array Modulo Alternating I

## Remainder-pair enumeration

Only the current remainder of each element matters. For a fixed pair
`(x, y)`, every even-position element must be changed to remainder `x` and
every odd-position element to remainder `y`. The cheapest way to change one
remainder `current` to `target` is the shorter circular distance around the
modulus: `min((target - current) mod k, (current - target) mod k)`.

Try all distinct pairs `(x, y)` and keep the smallest total cost. The limits
are small, so direct enumeration is fast.

**Complexity:** `O(k² * n)` time, `O(1)` space.
