# Solutions — Snail Traversal

## Prototype enhancement with index math

The array enhancement itself lives on `Array.prototype` as `snail`: given
`rowsCount` and `colsCount`, every source element at linear index i lands
in a cell computed without any mutable cursor. The column is `i /
rowsCount`; inside that column the offset `i % rowsCount` runs top-to-
bottom on even columns and bottom-to-top (`rowsCount - 1 - offset`) on
odd ones. Writing each value straight into its final cell keeps one pass
over the data; an empty result matrix rows-first allocation makes the
fill order irrelevant. Validity is a single guard — any case where
`rowsCount * colsCount !== nums.length` renders `[]`, including empty
inputs, because no positive product can match length zero.

The judged entry point stays a one-liner: it receives the plain typed
array from the wire and simply invokes the freshly enhanced
`nums.snail(rowsCount, colsCount)`. TypeScript gets the same behavior by
merging `snail` into the global `Array` interface before the method is
assigned, so the delegated call typechecks against the merge.

**Complexity:** `O(n)` time, `O(n)` space for the output grid.
