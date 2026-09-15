# Solutions — Sum of Values at Indices With K Set Bits

## Sweep once and count each index's set bits on the fly

An element contributes exactly when its own index carries k set bits,
so one pass over the array suffices: at position i count the 1-bits in
i's binary form and add nums[i] to a running total only on an exact
match against k. Nothing else about nums matters, so there is no
preprocessing, no auxiliary structure, and no second scan.

The per-index count never converts to a string or divides by two:
repeatedly clearing the lowest set bit with rest & (rest - 1) strips
exactly one 1-bit per step, so the inner loop runs once per set bit and
stops as soon as the index becomes zero. Indices are bounded by n - 1
<= 999, ten bits wide, so each count costs at most ten cheap bitwise
steps no matter how sparse the index's representation is.

The total is bounded too — at most 1000 values of at most 10⁵ sum to
10⁸, well inside a signed 32-bit int — so plain machine integers carry
the accumulation in every language. Every index is visited once, and
each visit does work proportional only to the number of set bits it
owns.

**Complexity:** `O(n · b)` time, `O(1)` space, where b <= 10 is the bit
width of the largest possible index.
