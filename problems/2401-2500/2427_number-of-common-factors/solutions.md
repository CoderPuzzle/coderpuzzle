# Solutions — Number of Common Factors

## Divisor count of the gcd

An integer divides both `a` and `b` exactly when it divides `gcd(a, b)`: any
common divisor must divide the gcd, and any divisor of the gcd divides a
common divisor, hence both numbers. The answer is therefore the number of
divisors of a single value `g = gcd(a, b)` — at most 1000 here — instead of
a sweep over the whole `[1, 1000]` range the hint suggests.

Euclid's algorithm reduces the pair to `g` in a handful of modulo steps.
Counting divisors then only needs trial division up to `sqrt(g)`: each `d`
in that range with `g % d == 0` brings a second divisor `g / d` from above
the root, except in the perfect-square case `d * d == g` where the pair
collapses and `d` counts once.

Both stages are tiny: Euclid is logarithmic in `min(a, b)`, and the divisor
loop runs at most 32 iterations for `g <= 1000`. Nothing beyond a few
scalars is stored.

**Complexity:** `O(sqrt(gcd(a, b)) + log(min(a, b)))` time, `O(1)` space.
