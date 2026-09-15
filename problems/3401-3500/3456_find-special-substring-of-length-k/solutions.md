# Solutions — Find Special Substring of Length K

A candidate substring is made of one character, so it lives inside a maximal
run of that character — and the two boundary conditions pin it down to the
whole run, which turns the search into simple run-length bookkeeping.

## Run decomposition

Take any maximal run of some character `c`, say positions `[start, end]`. A
valid window of `c`'s cannot start after `start`: the character immediately
before it would still be `c` from the same run. Symmetrically it cannot end
before `end`, because the character immediately after would be `c` again. So
the only window inside this run that can possibly satisfy the boundary
conditions is the run itself, and it qualifies exactly when its length equals
`k` — at the string's edges the missing neighbor is automatically fine, which
the run view already encodes.

The code therefore walks the runs once: an inner scan extends `j` while the
character matches `s[i]`, and the run length `j - i` is compared against `k`,
returning early on the first hit. `k` is at most the string length, so no run
can be skipped by the comparison, and the walk is a single pass with two
indices and no extra storage.

**Complexity:** `O(n)` time, `O(1)` space.
