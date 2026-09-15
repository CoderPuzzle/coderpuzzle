# Solutions — Check if Strings Can be Made Equal With Operations I

## Sort each two-slot index pair independently

The operation is far more rigid than its wording suggests. A legal swap
needs `j - i = 2`, so within a length-4 string only index pairs `{0, 2}`
and `{1, 3}` are ever touched — and those two slots never exchange
letters with each other. Every operation keeps even indices even and odd
indices odd forever. Inside one such pair matters only whether we swap,
and swapping twice reproduces the original string, so each string has
exactly four reachable forms: itself, either pair exchanged, or both.

That collapses the whole question into two tiny unordered comparisons.
Two strings can be driven to equality if and only if, for each of the two
index pairs, both strings hold the same two letters in that pair — the
order within the pair is irrelevant because the swap repairs any
mismatch there, while any difference in letters cannot be repaired
because nothing moves a character across pairs or changes one into
another (Example 2's `"abcd"` vs `"dacb"` holds `{a, c}` against
`{d, c}` on slots {0, 2} and `{b, d}` against `{a, b}` on {1, 3}, so it
must stay false). Sorting the two characters of every pair and comparing the sorted results
checks precisely this; a brute-force walk over all sixteen variants would
confirm the same four-form picture Hint 1 points at.

Everything here works on fixed width-4 strings: eight character reads,
four two-element sorts, at most two comparisons per pair — costs are
constant with counters nowhere near 32-bit range.

**Complexity:** `O(1)` time, `O(1)` space.
