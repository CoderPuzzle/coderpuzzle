# Solutions — X of a Kind in a Deck of Cards

## Fold the gcd of the counts

A group holds `x` cards of a single value, so once `x` is chosen each value's
entire supply must break into whole groups of `x`: its count has to be a
multiple of `x`, with every card placed in exactly one group. Nothing else
constrains the split — groups never mix values — so a valid group size exists
exactly when some `x >= 2` divides every count at once.

The common divisors of all the counts are precisely the divisors of their
greatest common divisor, so the largest workable group size is the gcd of the
counts, and the deck partitions iff that gcd reaches 2. The code counts each
value into a hash map, then folds a running `common`: seeding it with 0 is safe
because `gcd(0, c) = c`, so the fold absorbs each count in turn and ends at
the gcd of all of them. `[1,2,3,4,4,3,2,1]` folds 2, 2, 2, 2 and answers true;
`[1,1,1,2,2,2,3,3]` folds 3, 3, 2 down to 1 and answers false.

The work is one counting pass over the `n` cards plus a Euclidean fold over
the `d` distinct counts, each at most `m`. Note that `x` need not be prime and
the gcd never exceeds the smallest count, since it divides all of them: a deck
of twelve 4s accepts groups of 2, 3, 4, 6, or 12, while counts 2, 4, 6 leave
pairs as the only choice.

**Complexity:** `O(n + d log m)` time, `O(d)` space.
