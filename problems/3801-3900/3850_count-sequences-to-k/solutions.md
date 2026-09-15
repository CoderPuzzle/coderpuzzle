# Solutions — Count Sequences to K

Forward dynamic programming over the running value's (2, 3, 5) exponent
triple, one dictionary sweep per element.

## Exponent-triple forward DP

Every element is 1..6, so it factors completely over the primes 2, 3, and
5: val is always the rational 2^a · 3^b · 5^c, whatever the choices. The
three actions become uniform shifts of that triple — multiplying by an
element adds its own (2, 3, 5) split, dividing subtracts it, and leaving
val untouched changes nothing — so a sequence of choices wins exactly when
the accumulated triple equals k's factorization. That also settles
unreachable k immediately: if repeatedly dividing k by 2, 3, and 5 leaves
anything but 1, no sequence can ever land on k and the answer is 0.

The sweep keeps a map from reachable triples to path counts, seeded with
(0, 0, 0) → 1 for val = 1. Each element is factored by the same little
loop used for k, every carried triple fans out into its three successors,
and the counts merge; after the last element the map is read at k's
triple. The fixed-width languages pack (a, b, c) into one integer key
((a + 40) · 41 + (b + 20)) · 41 + (c + 20): over n <= 19 elements the
running exponents stay within |a| <= 2n <= 38 and |b|, |c| <= n <= 19, so
the low digits never leave a 41-stride and adding or subtracting the
element's packed step cannot borrow across digits. An element of 1 packs
to step 0, and its three branches correctly pile 3 · wt paths back onto
the same key.

The reachable triples number at most (4n + 1)(2n + 1)² — 77 · 39 · 39 =
116,823 at n = 19 — so with S the live state count the sweep performs
O(n · S) map updates, everything iterative with no recursion. Counts are
bounded by the total sequence count 3^19 = 1,162,261,467, inside a
32-bit return with room to spare; the fixed-width languages accumulate in
64-bit anyway. k itself reaches 10¹⁵, beyond 32 bits, so it travels as a
64-bit parameter — still ninefold inside JavaScript's exact 2⁵³.

**Complexity:** `O(n·S)` time, `O(S)` space.
