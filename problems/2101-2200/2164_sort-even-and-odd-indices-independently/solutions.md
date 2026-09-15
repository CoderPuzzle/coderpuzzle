# Solutions — Sort Even and Odd Indices Independently

## Split, sort, re-interleave

Index parity splits the array into two independent groups: the values at
even indices and the values at odd indices never trade places with each
other, only among themselves. So the rearrangement is three local steps —
collect the two strided groups, order each by its own rule (evens
non-decreasing, odds non-increasing), and write the sorted values back
through the same strides, slot by slot.

Slicing by stride 2 from index 0 and from index 1 expresses both groups
directly, and writing the sorted slices back through those strides restores
the interleaving without any index bookkeeping. A length-1 array has one
even slot and no odd slots, so both writes degenerate harmlessly — the
statement's second example, where nothing moves, needs no special case.

**Complexity:** `O(n log n)` time, `O(n)` space.
