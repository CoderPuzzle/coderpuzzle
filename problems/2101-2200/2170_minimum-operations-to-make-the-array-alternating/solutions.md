# Solutions — Minimum Operations to Make the Array Alternating

## Keep the modal value on each parity

An alternating array is completely determined by two choices: the value
that fills every even index and a different value that fills every odd
index. An element therefore survives unchanged exactly when its value was
chosen for its parity, so minimizing operations means maximizing kept
elements, and the best choice per parity is simply that side's most
frequent value.

One wrinkle: the even winner and the odd winner can collide. When the top
choices on both sides name the same value, one side has to settle for less,
and the fallback does not have to occur in `nums` at all — any fresh
positive integer keeps nothing but is always available as the "different"
partner (for `[7, 7, 7, 7]` the best is keep one side's 7s and rewrite the
other four). The solution counts both parities into frequency maps and
tries every pairing from each side's top two values plus that zero-yield
fresh value, rejecting the pairs whose values are equal. The answer is `n`
minus the largest legal kept total. A single-element array is already
alternating and needs no work.

Everything is one counting pass plus constant work over four candidate
pairs.

**Complexity:** `O(n)` time, `O(n)` space.
