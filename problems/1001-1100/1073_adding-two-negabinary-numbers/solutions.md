# Solutions — Adding Two Negabinary Numbers

## Digit-by-digit addition with a propagated carry

Base -2 addition works the same way ordinary binary addition does: walk
both digit arrays from the least-significant end (the tail of each
array) toward the most-significant end, adding a running carry into
each column and pushing that column's carry into the next one. The
wrinkle is the negative base — a column's raw total (`d1 + d2 +
carry`) can land outside `{0, 1}`, and it can even go negative, so
digit extraction needs to be sign-safe.

The fix is to work in two's-complement bits instead of a mod/div pair
that behaves differently across languages for negative operands:
`total & 1` is always the correct digit, because the low bit of a
two's-complement integer already equals its floor-mod-2 regardless of
sign, and `-(total >> 1)` is always the correct next carry, because an
arithmetic (sign-extending) right shift computes `floor(total / 2)`,
matching the base -2 identity `total = digit + (-2) * carry`. Working
through every reachable total confirms the carry never leaves `{-1, 0,
1}`, so it stays well within any language's native integer range.

The loop runs until both arrays are exhausted and the carry has settled
to `0` — a nonzero carry on the final column produces one extra
leading digit, which is how the result can end up longer than either
input. Digits come out least-significant first and are reversed at the
end; any leading zeros introduced by, for example, one input being
`[0]`, are stripped, keeping a single `0` if the whole result collapses
to zero.

**Complexity:** `O(n)` time, `O(n)` space, where `n` is the length of
the longer input array.
