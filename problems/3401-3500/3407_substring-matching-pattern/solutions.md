# Solutions — Substring Matching Pattern

The pattern has exactly one star, so a match is two fixed strings appearing
in order: the part before the star, then the part after it, with the star
stretching over whatever lies between.

## First prefix occurrence, last suffix occurrence

Cut `p` at the `'*'` into a fixed prefix `pre` and a fixed suffix `suf`. A
match exists exactly when some occurrence of `pre` ends at or before some
occurrence of `suf` starts — the star then covers the gap, which may be
empty. To test that in one shot, take the earliest occurrence of `pre`
(`find`) and the latest occurrence of `suf` (`rfind`): if even that pair is
out of order, no pair is, and if it fits, that pair itself is a witness.

Both searches return a not-found sentinel when their side is absent, and
either failure rejects the match outright. Empty pieces need no special
handling in any of the languages here: searching for the empty string
succeeds at index 0 for `find` and at the length of `s` for `rfind`, which
is precisely the "always present at the boundary" behavior the star-at-edge
cases require.

**Complexity:** `O(n * m)` time, `O(1)` extra space, where `n` is the
length of `s` and `m` the length of `p` (built-in substring search; linear
in practice).
