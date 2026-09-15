# Solutions — Check if There is a Valid Partition For The Array

## Dynamic programming over prefix ends

A partition is valid exactly when every block is one of the three good
shapes, so the natural question to ask about a prefix is: can
`nums[:i]` be validly partitioned? Call that `ok[i]`. Any valid partition of
`nums[:i]` ends with a final block of length two or three — the shapes on
offer — and chopping that block off leaves a shorter prefix whose validity
is again an `ok` question. That recursion bottoms out at `ok[0] = True`
(the empty prefix needs no blocks).

Concretely, `ok[i]` becomes true through three routes: the last two
elements are equal and `ok[i-2]`; or the last three are equal and
`ok[i-3]`; or the last three rise in steps of exactly one and `ok[i-3]`.
Each index looks back at most three positions, so a single left-to-right
pass filling a boolean table settles the whole array, and `ok[n]` is the
answer.

The table can be trimmed to three rolling scalars since the reach is only
three, but with `n <= 10⁵` the plain array is just as fast in practice and
keeps the indexing transparent.

**Complexity:** `O(n)` time, `O(n)` space.
