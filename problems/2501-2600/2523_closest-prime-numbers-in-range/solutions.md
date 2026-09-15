# Solutions — Closest Prime Numbers in Range

Everything here turns on one question — which numbers in `[left, right]`
are prime — and two machines answer it. The per-number test makes each
candidate speak for itself: trial division walks that number's own
divisors down toward its square root, and nothing below `left` is ever
touched. The sieve strikes the opposite bargain, spending one shared
pass on every number up to `right` so the window's flags can be read
for free afterwards. Narrow, high windows can favor the per-number
test; as the window widens, the sieve's amortized pass pulls ahead.
Either way the primality facts feed the same ascending scan over the
window's consecutive primes, which keeps the narrowest gap and, among
ties, the pair with the lowest `p`.

## Per-Number Primality Test

Trial division judges one number at a time, with no table to consult.
Two and three are settled by a single modulo each, and every remaining
prime divisor is a neighbor of a multiple of six, so the candidates run
`d`, `d + 2` while `d` steps by six from 5 — 5, 7, 11, 13, 17, 19, ...
— until `d * d` passes `n`. A composite surrenders at its smallest
factor, usually at once; only a prime survives all the way to the
square root.

The shared ascending scan then reads the answer off the primes: a pair
with another prime strictly between its members can never win, so only
consecutive primes need comparing. Each prime checks its gap to the
previous prime seen and records a new best only on strict improvement —
which leaves the lowest `p` holding the title on ties, exactly the
statement's tie rule. A window with fewer than two primes records
nothing, and `[-1, -1]` falls out untouched.

The bill is per candidate, not per range, and nothing outside
`[left, right]` is ever visited — no table below `left`, no flags above
`right`. That makes the test attractive when the window is narrow and
sits high, where a sieve over everything below `right` would waste
nearly all of its work. Swept across a wide window the repeated
small-divisor testing loses to the sieve's shared pass, which is why
the sieve closes these solutions.

**Complexity:** `O((right - left) · sqrt(right))` time, `O(1)` extra
space — a prime pays about `sqrt(right) / 3` divisions; composites
give up at their smallest factor.

## Sieve of Eratosthenes plus a consecutive-prime scan

Every candidate pair is two primes inside `[left, right]`, so the first
job is knowing exactly which numbers in the window are prime. A Sieve of
Eratosthenes up to `right` computes all of them in one global pass:
multiples of each surviving base `f` are crossed off starting at
`f * f`. The window itself needs no separate logic — the scan just reads
flags between `left` and `right`.

The best pair can always be taken from _consecutive_ primes of the
window. If a pair has some other prime strictly between its members,
that interior prime forms adjacent pairs whose gaps are each smaller.
So one ascending sweep keeps only the previous prime seen; when the gap
to it improves on the current best, the pair is recorded. Replacing
only on strict improvement means the earliest qualifying pair survives
gaps — which is precisely the "smallest num1" tie rule.

Bounds are tiny (`right <= 10⁶`, gaps fit comfortably in 32 bits), so
the work is the sieve itself.

**Complexity:** `O(right log log right)` time for the sieve plus an
`O(right - left)` scan, `O(right)` space for the flag table.
