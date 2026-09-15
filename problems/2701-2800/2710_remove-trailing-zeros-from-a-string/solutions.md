# Solutions — Remove Trailing Zeros From a String

## Scan back past the trailing zeros

All trailing zeros sit in a contiguous run at the very end of `num`, so
one backward scan finds the last non-zero digit: decrement an index while
the character under it is `'0'`. Everything from the start of the string
through that index is exactly the integer without its zero tail, and it
can be sliced out in one piece.

The constraint that `num` represents a positive integer with no leading
zeros is what makes the scan safe: at least one digit is non-zero, so the
loop always stops inside the string and the result is never empty.
Interior zeros are untouched by construction — the scan halts at the
first non-zero digit found from the right, and only the suffix beyond it
is discarded.

**Complexity:** `O(n)` time, `O(n)` space for the returned string.
