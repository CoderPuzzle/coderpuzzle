# Solutions — Replace All Digits with Characters

The `shift(c, x)` operation is nothing more than character arithmetic:
advancing `c` by `x` positions is `ord(c) + x`, and since the statement
guarantees every result stays at or below `'z'` no wraparound handling is
needed. Each digit sits at an odd index with its partner letter at
`i - 1`, so one left-to-right pass over the string resolves everything —
the digit being replaced never feeds a later shift.

## In-place odd-index shifts

Convert the string to an editable buffer and walk the odd indices in
steps of two: set position `i` to the character obtained by adding the
digit value (`s[i] - '0'`) to the code of `s[i - 1]`. Even indices are
untouched, odd-length strings simply leave their last letter alone. The
buffer is written back as the answer.

Every character is visited once and each step is constant work.

**Complexity:** `O(n)` time, `O(n)` space.
