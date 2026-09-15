# Solutions — Remove Outermost Parentheses

## Depth counter

Every primitive block starts at depth 0 with its opening `(` and returns
to depth 0 with its closing `)`; those two characters are exactly the
ones to drop. A single running `depth` counter that tracks how many
unmatched `(` are currently open finds them without ever building the
primitive decomposition explicitly.

For each `(`, the character is kept only if `depth > 0` — that is, only
if some other primitive block is already open, so this `(` is not an
outermost one — and then `depth` is incremented. For each `)`, `depth` is
decremented first, and the character is kept only if the decremented
`depth` is still greater than 0, i.e. this closer did not just bring the
count back to 0. Decrementing before the keep check (rather than after)
is what correctly classifies the closing paren of a primitive block as
the outermost one to remove; checking pre-decrement would misclassify
it. Walking `s` once and appending the kept characters to a buffer
produces the answer in a single pass.

**Complexity:** `O(n)` time, `O(n)` space.
