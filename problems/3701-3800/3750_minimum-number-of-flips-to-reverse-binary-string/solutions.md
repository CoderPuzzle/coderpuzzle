# Solutions — Minimum Number of Flips to Reverse Binary String

## Two-pointer pair scan

The target is fixed before any flip happens: it is the original string read backwards. A flip changes exactly one bit of `s`, so a position whose current bit already matches its bit in the target costs nothing, and a position whose bit differs needs exactly one flip — flipping it more than once or touching other positions can only waste moves. The answer is therefore the number of positions where `s` disagrees with `reverse(s)`.

That disagreement has mirror symmetry. Position `i` holds `s[i]` and must become `s[len - 1 - i]`; position `len - 1 - i` holds `s[len - 1 - i]` and must become `s[i]`. So whenever the two ends of a pair differ, both members miss their target, and the pair contributes exactly two flips; when they agree, both already match and it contributes none. Walking two pointers inward from the ends and adding two per unequal pair counts every position exactly once without ever materializing the reversed string.

The loop stops when the pointers meet. A middle character in an odd-length string pairs with itself — its target bit is its own bit — so it never needs a flip, which the strict `left < right` condition handles by simply skipping over it.

**Complexity:** `O(log n)` time, `O(log n)` space.
