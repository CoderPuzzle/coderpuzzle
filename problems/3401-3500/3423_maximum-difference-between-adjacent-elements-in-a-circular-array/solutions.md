# Solutions — Maximum Difference Between Adjacent Elements in a Circular Array

A circular array of n elements has exactly n adjacent pairs: the n - 1
neighbors inside the array plus the pair formed by the last and first
elements. The answer is the largest absolute difference over those n
pairs.

## One pass over the circular edges

Walk i from 0 to n - 1 and compare each element with the one at
(i + 1) mod n. The modulo makes the final iteration pair the last
element with the first, closing the ring without any special-cased
extra comparison after the loop. A running maximum collects the largest
absolute difference seen.

For `[1,2,4]` the interior edges contribute |1-2| = 1 and |2-4| = 2,
while the wraparound edge contributes |4-1| = 3, which wins. Values are
bounded by 100 in absolute value, so every difference fits comfortably
in a 32-bit integer and no overflow bookkeeping is needed.

**Complexity:** `O(n)` time, `O(1)` extra space.
