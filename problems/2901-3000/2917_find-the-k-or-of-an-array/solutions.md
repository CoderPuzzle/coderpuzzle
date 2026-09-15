# Solutions — Find the K-or of an Array

## Count each bit position independently

The K-or operation treats every bit position as its own yes-or-no vote, and
no position ever influences another. Since every `nums[i]` is below `2³¹`,
only the 31 positions `0..30` can appear in any element, so the whole answer
is decided by 31 independent counts: fix a position, count the elements that
carry a `1` there, and set the result bit exactly when the count reaches
`k`.

Testing whether an element carries a given bit is the standard mask test —
`(num >> bit) & 1` is `1` precisely when the bit is set — which makes each
count a single pass over the array. With at most 50 elements, the double
loop does at most `31 × 50 = 1550` constant-time checks. Bit 31 is never
examined because no input can carry it, which also guarantees the result is
a non-negative 32-bit integer in every language.

**Complexity:** `O(31 × n)` time, `O(1)` space.
