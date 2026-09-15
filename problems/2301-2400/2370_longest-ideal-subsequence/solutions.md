# Solutions — Longest Ideal Subsequence

## One DP value per ending letter

The classic subsequence DP — "longest ideal chain ending at index `i`" —
would compare `s[i]` against every earlier index, an `O(n²)` sweep. The
observation that collapses it: two chains that end on the same letter are
forever interchangeable, because any future letter compatible with one is
compatible with the other. So only the best chain per ending _letter_
matters — 26 numbers instead of `n`.

Processing characters left to right with `best[c]` = the longest ideal
subsequence so far that ends with letter `c`, a new character of letter
`c` extends whichever existing chain ends in some letter within `±k` of
`c` in alphabet order; taking the maximum over that window and adding one
is the new candidate for `best[c]` (a lone character is always available,
so the window scan plus one already covers length-1 chains). The window is
at most `2k + 1 <= 51` letters wide, making each step constant time. The
answer is the largest entry after the scan.

The alphabet is deliberately non-cyclic: the window clamps at `'a'` and
`'z'` rather than wrapping, exactly matching the note in the statement.

**Complexity:** `O(n · k)` time (at most a 51-wide window per character),
`O(1)` space.
