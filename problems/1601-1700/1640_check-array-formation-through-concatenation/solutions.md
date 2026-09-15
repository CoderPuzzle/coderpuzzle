# Solutions — Check Array Formation Through Concatenation

## First-element hash map

Because every value across `pieces` is distinct, each piece is uniquely
identified by its first element — no two pieces can begin the same way,
and no piece can begin partway through another piece's run inside `arr`.
That lets us build a hash map from `piece[0]` to the piece itself in one
pass over `pieces`, turning "which piece could start here" into an O(1)
lookup instead of a scan.

The code then walks `arr` from the front. At each position it looks up
the piece whose first element equals `arr[index]`; if none exists, no
piece can extend the array here and the answer is `false`. Otherwise it
compares the piece against the corresponding slice of `arr` element by
element — this is what catches cases like `pieces = [[16,18,49]]` against
`arr = [49,18,16]`, where the values match but the internal order does
not — and on a full match it advances `index` past the piece and
continues. Reaching the end of `arr` with every position accounted for
means the pieces reassemble it exactly, so the method returns `true`.

**Complexity:** `O(n)` time, `O(n)` space.
