# Solutions — First Unique Even Element

## Two-pass hash-map scan

An even value is the answer exactly when it occurs once in the whole array
and it is the earliest such value by index. The natural approach is to
learn the counts first, then re-scan from the front and stop at the first
element that passes both tests. A hash map from value to frequency makes
the "appears exactly once" test O(1) per element.

The code builds the frequency table in one pass, then walks `nums` again
in order. For each value it checks `value % 2 == 0` and `count == 1`; the
first hit is returned immediately, preserving the "earliest by array
index" requirement with no extra bookkeeping. If the scan finishes without
a hit the method returns -1. Duplicates of an even value never match, so
the scan simply skips them, and odd values are filtered by the parity test
before the count is consulted.

Because every `nums[i]` is at most 100, the whole computation fits easily
in a 32-bit integer, and the two passes plus one map are all the work
there is.

**Complexity:** `O(n)` time, `O(n)` space.
