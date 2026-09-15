# Solutions — Iterator for Combination

## Bitmask enumeration with a final sort

`characters.length <= 15` means at most `2^15` subsets — small enough to
materialize everything up front. Walk the masks in increasing order,
keep those whose popcount equals `combinationLength`, and read each kept
mask's set bits in ascending index order to spell out its combination
from the sorted, distinct letters. One subtlety: ascending mask order
groups the strings by their _highest_ chosen index (`abc abd acd bcd
abe ...`), not by first letter, so one explicit lexicographic sort of
the collected strings restores the required sequence. After that,
`next()` walks a cursor through the list and `hasNext()` compares it
with the length.

The alternative is an incremental successor algorithm (advance the
rightmost position that can move, shift the suffix), which uses O(k)
memory instead of O(C(n,k)·k) — worth it only when memory, not call
count, is the constraint; here the preprocessing bound of 2^15 strings
is trivially affordable and keeps both methods O(1).

**Complexity:** preprocessing `O(2^n · n + 2^n log 2^n)` time for
`n = characters.length`, `O(2^n · k)` space; then `O(1)` per
`next()`/`hasNext()`.
