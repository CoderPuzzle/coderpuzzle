# Solutions — Find the K-th Character in String Game II

## Replay the path of one character

Building the word is hopeless — with 100 operations the final string can span
2¹⁰⁰ characters — but the answer never needs it. Work backwards from `k`
through the operations. Operation `i` first produces the second half by
copying (and, for type 1, shifting) the first half; a position in that second
half maps back to `k - length/2`, while any `k` within the first half is
untouched by the operation and can be left alone. Replaying which operations
actually touched the position therefore shrinks `k` to at most half each
time an operation matters.

The shift count is all that survives the replay: every type-1 operation whose
first half still contained position `k` advances the letter once more,
cyclically past `'z'` back to `'a'`. The starting word is `"a"`, so the
answer is `'a' + (number of qualifying shifts) mod 26`. Example 2 checks out:
`k = 10` falls inside the final type-1 operation's appended half, so it maps
down to `k = 2` and banks one shift; every earlier operation leaves position
2 in its first half, and `'a'` advanced once is `'b'`. JavaScript's plain
`number` stays exact here: `k <= 10¹⁴ < 2⁵³`, each step only halves
`position`, and the `2 ** index` thresholds are exact powers of two up to
2¹⁰²³ — only the _lengths_ grow astronomically, never an arithmetic
operand beyond those bounds.

The backward walk visits each operation at most once, so the cost follows the
operation count rather than any string length. No buffers are needed beyond
a counter for the shifts.

**Complexity:** `O(operations.length)` time, `O(1)` space.
