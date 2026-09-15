# Solutions — Shuffle the Array

## Two cursors, alternating writes

The output position of every element is fixed arithmetic: `xi` lands at
`2i` and `yi` at `2i + 1`. So the direct construction walks two cursors —
one at index `0` for the x half, one at index `n` for the y half — and
appends first from the x cursor, then from the y cursor, advancing both
each round.

One output array of `2n` slots is allocated up front and filled in order,
so there is no reordering in place and no aliasing subtlety. At `n` up to
500 the pass is a thousand writes.

(The classic bit-packing trick — storing `y`'s value inside `x`'s slot
as `nums[i] + 1024 * nums[i + n]` and decoding in place — achieves
`O(1)` extra space; it is the same interleave wearing a constant-space
costume, and the values' bound of `10³` is exactly what makes the packing
safe.)

**Complexity:** `O(n)` time, `O(n)` space for the result.
