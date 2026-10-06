# Solutions — Nested Sequence Iterator

## Flatten eagerly, iterate by cursor

The constructor walks the nested structure depth-first and copies every
integer hold into a flat array in encounter order — that order is exactly
the order `nextValue()` must produce, because a preorder traversal of a nested
list visits each integer precisely where it appears in the flattened
sequence. `nextValue()` returns the array entry under a cursor and advances it;
`hasMore()` is a cursor-versus-length comparison. Empty list holds fall out
naturally: they contribute nothing to the array.

All the traversal work happens once up front, so the per-call cost of the
iterator protocol is constant — the pseudocode loop's total work is linear
in the number of integers regardless of how the calls interleave.

**Complexity:** `O(N)` construction time and `O(N)` space for `N` total
elements; `nextValue()`/`hasMore()` are `O(1)`.
