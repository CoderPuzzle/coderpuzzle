# Solutions — Find Kth Character in Expanded String

## Block-walking scan

The expansion gives every character of `s` a block of consecutive copies in `t`: a
word's letter at offset `i` (0-based) owns `i + 1` slots, and a space owns exactly
one. Those blocks tile `t` from left to right in the same order the characters
appear in `s`, so the answer can be located by walking `s` once and keeping a
running offset within the current word — reset to zero when a space passes, bumped
by one for each letter — which makes the next block's size known on arrival.

Subtracting each block's size from `k` turns the question "which block holds slot
`k`?" into "when does the running total first overshoot `k`?": after charging the
current character's cost, a negative remainder means the original `k` pointed
inside that very block, so the current character is the answer. The walk never
materializes `t`, and it cannot be avoided either — with one word of length `10⁵`
the expanded string spans about `5 × 10⁹` characters, so any approach that builds
`t` exhausts memory long before it finds the slot. Because `t`'s length tops out
near `5 × 10⁹`, the running subtraction must live in 64-bit arithmetic (a plain
JS number still suffices, as that bound sits far below `2⁵³`).

**Complexity:** `O(n)` time, `O(1)` space.
