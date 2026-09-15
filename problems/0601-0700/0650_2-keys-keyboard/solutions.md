# Solutions — 2 Keys Keyboard

## Prime factor sum

Only two quantities matter: how many 'A's the screen shows and how many the
clipboard holds. A paste adds the clipboard to the screen; a copy sets the
clipboard equal to the screen. Between two consecutive Copy All operations the
clipboard never changes, so any plan decomposes into segments — one Copy All
followed by p − 1 Pastes — and a segment multiplies the screen by p at a cost
of exactly p operations. The clipboard starts empty, so pasting before the
first copy is dead weight, and a plan whose segments have multipliers
p₁·…·pₖ = n costs p₁ + … + pₖ. Every factorization of n into factors of at
least 2 is realizable by its segments, which turns the search into arithmetic:
minimize the factor sum over all factorizations of n. For n = 3 the single
segment is the plan of Example 1 — copy, paste, paste, three operations — and
for n = 1 no segment is needed at all, since the screen already shows one
'A'.

Splitting a composite factor never costs more: for a, b ≥ 2 the inequality
a + b ≤ a·b is exactly (a − 1)(b − 1) ≥ 1, with equality only at 2 · 2. So
repeatedly breaking every composite factor down to primes can only lower the
total, and it strictly lowers it everywhere except 4 = 2 · 2 — the minimum is
the fully split factorization, i.e. the sum of n's prime factors with
multiplicity. A prime p has no split and pays p: one copy plus p − 1 pastes.
For n = 12 = 2 · 2 · 3 that gives 2 + 2 + 3 = 7, beating both the single
factor 12 and the split 2 + 6 = 8, while 3 + 4 merely ties 7 before 4 itself
splits.

The loop below strips factors off n directly: for each p from 2 upward, it
divides n by p as long as p divides it, adding p per factor. Once p · p
exceeds what remains, that remainder is either 1 or a prime larger than p,
which is added in one final step. n = 1 skips both loops and returns 0. The
domain stops at 1000, so p climbs no further than 31 and every intermediate
product fits comfortably in 32-bit arithmetic.

**Complexity:** `O(√n)` time (worst case: n is prime), `O(1)` space.
