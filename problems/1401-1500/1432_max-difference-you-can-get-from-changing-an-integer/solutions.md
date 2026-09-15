# Solutions — Max Difference You Can Get From Changing an Integer

## Two targeted replacements, one for each extreme

The difference `a - b` splits independently: maximize `a` over all legal
replacements and minimize `b` over all legal replacements, because the
two operations share only the unchanged original.

For the maximum, replacing any digit by `9` can never lower the value, so
the best move is to pick the first digit that is not already `9` and
rewrite it (and its duplicates) to `9`; if every digit is already `9`,
the identity replacement `x = y` keeps the value.

For the minimum the leading-zero rule does the steering. If the first
digit is not `1`, rewriting it to `1` shrinks the number the most — `1`
is the smallest value the leading digit may take. If the first digit is
already `1`, rewriting the first digit greater than `1` to `0` is the
sharpest legal move, since a `0` anywhere after the first position is
both allowed and the smallest digit there is; when no such digit exists
the number is all ones and zeros and stays as it is. Both replacements
run in one scan, and `num` fits comfortably in 32-bit arithmetic
throughout (`10⁸`-scale inputs changed to `9`s stay below `10⁹`).

**Complexity:** `O(d)` time for a `d`-digit number, `O(d)` space for the
digit buffers.
