# Solutions — Find And Replace in String

Every operation is judged against the original string — replacements are
simultaneous, so no operation ever re-indexes another — which reduces the
whole problem to one decision per operation (`sources[i]` read from
`indices[i]`: match or not) followed by one ordered walk that splices the
winners in. The statement's non-overlap guarantee is the fact that makes
the walk collision-free.

## One pass over the original string

Decide every operation against the untouched input first: operation `i`
succeeds exactly when `s`, read from `indices[i]`, starts with
`sources[i]` — a check bounded by 50 characters per the constraints.
Record the winners in an array indexed by start position, holding which
operation fires there, so any position answers in constant time whether a
substitution begins at it. A failed operation vanishes here, whether its
source appears elsewhere in `s` or nowhere at all.

Then scan `s` left to right holding that array. A position carrying a
winner emits its `targets[i]` and jumps past the consumed source; every
other position copies its character through and advances one. Because
positions reference the original indexing and two replacements never
overlap, a jump never lands inside another winner's span, so exactly the
replaced characters are skipped and nothing else. Each position and each
operation is touched a constant number of times, and the one non-constant
cost per operation — comparing its source — is capped at 50 characters, a
statement constant, keeping the whole pass linear in the input size.

**Complexity:** `O(n + k)` time, `O(n + k)` space.
