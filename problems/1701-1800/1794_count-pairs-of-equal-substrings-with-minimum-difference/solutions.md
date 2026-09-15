# Solutions — Count Pairs of Equal Substrings With Minimum Difference

The quantity being minimized mixes the two strings — an end index in one
against a start index in the other — and that crossover is what collapses
the search from all quadruples down to 26 letters.

## First and last occurrence per letter

A quadruple's value is `j - a`, and any match longer than one character can
shrink: keeping the leading character of each substring leaves the
quadruple `(i, i, a, a)` valid, `a` unchanged, and `j` only smaller. No
quadruple with `j > i` can therefore hold the minimum, so the optimal set
is exactly the single-character pairs — an occurrence `i` of some letter in
`firstString` against an occurrence `a` of the same letter in
`secondString`.

For a fixed letter, every occurrence `i` sits at or after the letter's
first index `f` in `firstString`, and every occurrence `a` sits at or
before its last index `l` in `secondString`, so `i - a >= f - l` with
equality only for the pair `(f, l)` itself: each letter contributes exactly
one candidate. Scanning each string once records those 26 candidates; the
answer is the number of letters present in both strings whose difference
equals the smallest one — 0 when the strings share no letter, because then
no valid quadruple exists. Indices stay below 2 * 10^5 and the count below
26, so everything fits comfortably in 32-bit integers.

**Complexity:** `O(n1 + n2)` time, `O(1)` space.
