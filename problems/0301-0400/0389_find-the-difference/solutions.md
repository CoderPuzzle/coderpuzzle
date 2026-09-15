# Solutions — Find the Difference

## XOR of every character code

String `t` is `s` rearranged, plus exactly one extra letter. XOR is the operation
that makes rearrangement invisible: it is commutative and associative, it cancels
any value paired with itself (`x ^ x = 0`), and 0 is its identity. Fold every
character code of `s` and every character code of `t` into one running
accumulator, and each letter of `s` meets its twin somewhere in `t` — position
never matters — so everything cancels except the one letter `t` carries alone.
The accumulator ends up holding exactly that letter's code; casting it back to a
character is the answer.

The scan keeps a single integer and walks both strings once, storing nothing per
character — no count table, no sorting. That is the O(1)-space property: the
working state stays one integer whether `s` is empty or at the 1000-letter
ceiling, and only the running time grows with the input.

**Complexity:** `O(n)` time, `O(1)` space.
