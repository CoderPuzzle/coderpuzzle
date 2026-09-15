# Solutions — Exactly One Consecutive Set Bits Pair

## Bit scan

Scan the bits of `n` while counting transitions into a set bit. Whenever both
the current and previous bits are one, increment a counter and stop scanning
if it reaches two.

The result is true only when the counter is exactly one.

**Complexity:** `O(log n)` time, `O(1)` space.
