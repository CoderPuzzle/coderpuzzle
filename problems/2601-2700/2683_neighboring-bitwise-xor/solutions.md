# Solutions — Neighboring Bitwise XOR

## Parity of the whole array

Every element of `original` is consumed by exactly two entries of `derived`:
`original[i]` appears in `derived[i] = original[i] ⊕ original[i + 1]` and again
in the neighbouring entry that also reads it — with the wrap-around making the
chain a cycle, so no element is used once and none three times. XOR-folding all
of `derived` therefore pairs up every occurrence, and `x ⊕ x` cancels to 0: the
fold equals 0 whenever `derived` really came from a binary `original`. If
instead the fold is 1, no assignment of 0's and 1's can reproduce `derived`,
since any candidate `original` would force the same all-canceling fold.

The converse makes the check sufficient, not just necessary: seed
`original[0] = 0` and reconstruct forward through
`original[i + 1] = original[i] ⊕ derived[i]`. By construction every equation
except the wrap-around one now holds, and that last equation reduces to
precisely the fold being 0. So a single pass accumulating the running XOR
settles the question, and the answer is whether the accumulator ends at 0.

**Complexity:** `O(n)` time, `O(1)` space.
