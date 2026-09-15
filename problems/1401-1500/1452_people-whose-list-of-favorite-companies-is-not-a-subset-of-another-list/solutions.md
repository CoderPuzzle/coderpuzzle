# Solutions — People Whose List of Favorite Companies Is Not a Subset of Another List

## Set membership per list, pairwise subset tests

A list is "covered" when some other list contains every one of its
companies, so the natural preparation is to turn each list into a set
once — then testing whether list `i` is inside list `j` is a walk over
`i`'s companies asking `j`'s set for membership, and a length shortcut
skips the test entirely when `i` is not strictly shorter than `j` (a set
can only be a subset of one at least as large, and the lists are pairwise
distinct).

Person `i` survives when no `j` covers them; scanning people in index
order and appending survivors keeps the answer increasing without a
final sort. With at most 100 lists of at most 500 companies the pairwise
loop is at most `100 · 100 · 500` set probes — trivial for hash sets.

The result holds every index whose list is not a subset of any other —
including single-person inputs, where nobody can be covered.

**Complexity:** `O(n² · m)` set probes for `n` lists of at most `m`
companies, `O(n · m)` space for the sets.
