# Solutions — Maximize Number of Nice Divisors

Every nice divisor carries at least one copy of each prime factor, so for
`n = p^a * q^b * ...` the number of nice divisors is exactly
`a * b * ...`: maximizing it means splitting the `primeFactors` budget
across exponents whose product is as large as possible.

## Threes, then at most two twos

A part of size 1 never changes a product, so the budget is spent exactly.
Any part `x > 4` splits into `floor(x/2) + ceil(x/2)` with a strictly
larger product, and three 2s lose to two 3s — so only 3s and at most two
2s survive. `n <= 4` answers `n` itself; `n % 3 == 0` gives `3^(n/3)`;
`n % 3 == 1` gives `4 * 3^((n-4)/3)` (where 2 + 2 beats 3 + 1);
`n % 3 == 2` gives `2 * 3^(n/3)`. The small-`n` exceptions are forced,
not conventions: with a budget of 1 through 4 the pieces are the budget
itself, which is why those answers skip the power machinery entirely.

The exponent reaches `10^9 / 3`, so the power is evaluated by iterative
square-and-multiply over residues modulo `10^9 + 7`. Every operand stays
below the modulus, so a product is at most `(10^9 + 6)^2 ~ 10^18`: exact
in Python integers and inside the 64-bit intermediates of
Java/C++/Go/Rust, but past the double's exact `2^53` range — the JS/TS
runtimes therefore run the multiplication on BigInt and convert back
only after the final reduction. Everything stays iterative; no recursion
anywhere.

**Complexity:** `O(log n)` time, `O(1)` space.
