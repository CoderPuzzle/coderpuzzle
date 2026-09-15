# Solutions — Minimum Operations to Make Array Equal III

## Divisor Bookkeeping

Fixing a target `x > 1` makes every element's price independent: an element
already equal to `x` pays nothing, one that divides `x` or is divisible by
`x` pays a single operation, and anything else pays exactly two — multiply
by `x` to reach `v·x`, then divide by `v` — with one operation never enough
when neither divisibility holds. So the answer is `Σ` of those prices for the
best possible `x`, and an array whose values are already uniform needs no
work at all (the all-ones array included).

The choice of `x` still looks unbounded, but two bounds close it. A target
absent from `nums` matches no element, so it costs at least one operation
per element, `n` in total; meanwhile the lcm of all elements costs at most
`n`, since every element divides it and reaches it with one multiplication.
The optimum therefore always sits at a present value greater than 1 or at
the lcm itself — `[2,3,5]` shows why the lcm must be kept: no present value
beats 4, yet target 30 equalizes everything in 3. The lcm is tracked only
until it outgrows 10⁹, after which it can no longer be an element and its
cost is exactly `n`.

Counting prices per candidate needs divisibility census, not simulation.
One sieve supplies primes up to `sqrt(10⁹)`; each distinct value is factored
by trial division and its divisors expanded from the factorization. Folding
every distinct value's frequency into `multipleCount[d]` over its divisors
makes `multipleCount[x]` the number of elements divisible by `x`, while
summing frequencies over `x`'s own divisors gives the number of elements
dividing `x`. Both groups contain the elements equal to `x` — they are
exactly the intersection — so charging `2n − dividing − divisible` prices
every element correctly and the minimum over candidates is the answer.

**Complexity:** `O(n·√MAX/log MAX + D)` time, `O(D + π(√MAX))` space.
