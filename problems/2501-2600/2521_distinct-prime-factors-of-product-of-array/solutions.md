# Solutions — Distinct Prime Factors of Product of Array

A prime divides the product exactly when it divides at least one
individual element, so neither approach ever forms the product: both
split every element into prime pieces, pool the pieces in one set, and
read the answer off the set's size. Where they differ is where the
pieces come from. Per-element trial division searches for them,
probing candidate divisors up to the square root of whatever remains —
`O(n · √V)` across `n` elements bounded by `V`, about 3·10⁵ probes at
this problem's corner of 10⁴ elements under 1000. The
smallest-prime-factor sieve precomputes instead: one `O(V log log V)`
pass (on the order of a thousand writes at `V` = 1000) records every
value's smallest prime factor, after which each element surrenders its
pieces in at most `log₂ V` known-prime divisions — nine here, since
2¹⁰ already overshoots 1000 — about 10⁵ lookups and divisions at the
same corner. The per-element coefficient falls from √V to log V while
the precompute is paid once, so the sieve's lead widens as the array
grows.

## Per-element trial division into a prime set

The product itself is astronomically large (10⁴ elements of up to a
thousand each), but its prime support is not: a prime divides the
product exactly when it divides at least one individual element. So the
factorization can be done per element and shared through one set, with
the answer being the set's final size — never materializing the product
at all.

Each element is broken down by trial division: walking candidate
divisors upward, when `d` divides the remaining value it must be prime
(anything composite would have had its factors stripped earlier), so it
joins the set and every copy of it is divided out. After the loop,
anything above 1 left over is itself a prime factor larger than its own
square root bound and joins the set too. Values are capped at 1000, so
candidates never exceed 31 once squared, keeping the whole scan tiny.

Duplicates across elements collapse naturally through the set — an
array of powers of two reports exactly one distinct factor, matching
example 2.

**Complexity:** `O(n · √V)` time for `n` elements with value bound `V`
(≤ 1000 here), `O(π(V))` space for the distinct-prime set.

## Shared smallest-prime-factor sieve, logarithmic peeling

The sieve removes the searching. One Eratosthenes-style pass over the
values up to `V` fills a table with each value's smallest prime
factor: walk each prime's multiples from its square upward, claiming
only the cells nothing smaller has already claimed — a composite is
always first met by its own smallest prime, so the table settles with
primes pointing at themselves and composites pointing at the prime
that divides them earliest.

Factoring an element is then a walk down its own table entries: read
the smallest piece, pool it, divide out every copy of it, repeat until

1. Nothing is ever probed and rejected — every lookup lands on a prime
   that genuinely divides the remainder — and each division sheds at
   least one prime factor, so at most `log₂ V` divisions happen per
   element (nine at this bound, 2¹⁰ already past 1000). The set still
   collapses repeats within and across elements: example 2's squared
   primes each pool a single factor, and the count stays 3.

The accounting is what reorders the approaches. Trial division's
candidate probes scale with `n · √V`; the sieve splits its cost into a
one-time `O(V log log V)` precompute shared by the whole array plus
`O(n · log V)` division walks — at the stated corner, about a thousand
table writes and 10⁵ divisions against 3·10⁵ probes. The table itself
is the only extra storage beyond the prime set.

**Complexity:** `O(V log log V + n · log V)` time for `n` elements
with value bound `V` (≤ 1000 here), `O(V)` space for the sieve table
plus the `O(π(V))` prime set.
