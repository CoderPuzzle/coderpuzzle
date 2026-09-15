# Solutions — Maximum Possible Number by Binary Concatenation

## Try every concatenation order

With exactly three numbers there are only `3! = 6` orders in which they
can be concatenated, so the whole search space fits on one hand. Each
order is assembled the same way: start from zero, and for every number in
the chosen order shift the accumulator left by that number's bit width —
its bit length, since no representation has leading zeros — then drop
the number itself into the freed bits. The largest value seen across the
six orders is the answer.

The enumeration is exhaustive rather than clever: no comparator decides
which number should go first, and none is needed, because the best order
depends on the actual bit patterns and not just on magnitude. Example 1
already shows a plain descending sort going wrong — `[3, 2, 1]`
concatenates `"11" + "10" + "1"` = 29, while the winning `[3, 1, 2]`
concatenates `"11" + "1" + "10"` = 30. Six candidates are cheap enough
to simply try them all.

The bound is tiny by construction. Each element is at most 127, so it
carries at most 7 bits, and three of them concatenated reach 21 bits —
under 2²¹ ≈ 2 million — far inside 32-bit range, so plain machine
integers hold the accumulator everywhere.

**Complexity:** `O(1)` time, `O(1)` space.
