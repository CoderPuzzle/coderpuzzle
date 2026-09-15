# Solutions — Generate Binary Strings Without Adjacent Zeros

Validity is a purely local property: whether a position may take a `0`
depends only on the character just before it. That makes one depth-first
walk over the two choices per position reach every valid string exactly
once — and, with a fixed try-order, in exactly the order the statement
pins.

## Backtracking over the previous character

The rule "`"00"` never occurs" only constrains each character against its
predecessor: after a `0` the next character is forced to be `1`, while
after a `1` (or at the very start) either character may follow. The search
therefore grows a candidate one character at a time and prunes the single
forbidden move — appending `0` right after a `0`. Nothing else can go
wrong deeper in the tree, so every branch that survives to length `n` is
a valid string, and no valid string is ever cut off: the pruning is exact,
not a heuristic.

The output order comes for free. At each position the walk tries `0`
before `1`, so among equal-length strings the depth-first visit sequence
is exactly ascending lexicographic order — the same string never arises
twice because each path is a distinct character choice — and no final
sort is needed. The count obeys the Fibonacci-like recurrence
`count(n) = count(n - 1) + count(n - 2)` (`n = 18` gives 6765 strings),
so the work is proportional to the size of the answer itself: each of the
`φ^n`-many strings costs one `O(n)` copy when it is emitted.

**Complexity:** `O(n · φ^n)` time, `O(n)` auxiliary space beyond the
`O(n · φ^n)` output.
