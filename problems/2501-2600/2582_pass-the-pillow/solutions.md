# Solutions — Pass the Pillow

## Folded Period Arithmetic

The pillow's motion is periodic with period `2 * (n - 1)` seconds: after
one traversal it sits at person `n`, after two it is back at person 1,
and every later second repeats that pattern. So `time` splits into a
number of complete single-direction traversals, `time / (n - 1)`, plus a
remainder of at most `n - 2` seconds — and only the parity of the full
count decides which end the final partial leg starts from.

An even traversal count leaves the walk heading forward from person 1,
so the answer is `1 + (time mod (n - 1))`; an odd count leaves it
heading backward from person `n`, so the answer is
`n - (time mod (n - 1))`. Both examples fall out directly: for
`(n, time) = (4, 5)` one full traversal plus a two-step backward leg
from person 4 lands on person 2, and for `(3, 2)` an exact single
traversal of length 2 leaves the pillow at person 3. Boundary times
behave too: an exact multiple of `n - 1` lands exactly on person `n`
when the quotient is odd and back on person 1 when it is even.

No data structure is needed, and nothing scales beyond constant memory.

**Complexity:** `O(1)` time, `O(1)` space.
