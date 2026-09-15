# Solutions — Maximum Value of an Alternating Sequence

## High-point arithmetic

If `n == 1`, the only value is `s`. Otherwise, the largest element must occur
at a "high" position of one of the two alternating patterns.

When starting with an increase, the first high is `s + m`. When starting with
a decrease, the first high is `s + m - 1`. Between consecutive highs there
must be one lower element, so each additional high can grow by only `m - 1`.
Take the better pattern.

**Complexity:** `O(1)` time, `O(1)` space.
