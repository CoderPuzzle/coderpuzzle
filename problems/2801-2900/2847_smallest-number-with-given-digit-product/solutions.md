# Solutions — Smallest Number With Given Digit Product

## Largest-first factor packing

Only the digits 2 through 9 can appear, and each of them factors over the
primes 2, 3, 5, 7 — so if n has any prime factor of 11 or more no digit
product can reach it and the answer is "-1". The primes 5 and 7 are worse
than inconvenient: multiplying either by anything above 1 immediately
needs a two-digit value, so every factor 5 stays as a lone digit "5" and
every factor 7 as a lone "7".

That leaves powers of 2 and 3 to arrange. Fewer digits always wins over
any later lexicographic tie-break, because a shorter positive integer is
smaller than a longer one, so the factors are packed into the densest
digits available: trial division starting at 9 and walking down to 2
groups three 2s into an "8", two 3s into a "9", pairs like 2 · 3 into a
"6", and so on. Because the large buckets are consumed first, whatever
spills out (a stray 2, 4, or a 2 · 3 pair) is the smallest possible tail,
and emitting the collected digit counts in ascending order then gives the
smallest arrangement without sorting.

The parameter rides the wire as decimal text: with n up to 10¹⁸ the JS
family must parse through BigInt (10¹⁸ exceeds the 2⁵³ exact-double
ceiling), while `long long`, `long`, `int64`, and Python integers absorb
it directly. Only ~60 divisions happen in total, all on bounded values.

**Complexity:** `O(log n)` time (a handful of trial divisions per digit),
`O(log n)` space for the answer (at most 20 digits).
