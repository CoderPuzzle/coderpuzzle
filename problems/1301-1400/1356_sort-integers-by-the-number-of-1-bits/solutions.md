# Sort Integers by The Number of 1 Bits

## Approach: Sort with a (popcount, value) key

The required order is exactly the lexicographic order of the pairs
(popcount, value): the bit count first, ascending, and the value breaking
ties, ascending. One sort of the array keyed by that pair produces the
answer; each popcount is the language's builtin bit-count over at most 14
bits (values up to 10⁴).

Java and C++ pack the pair into a single comparable integer —
`popcount << 16 | value` — because both fields fit (popcount ≤ 14,
value < 2¹⁶), which their primitive sorts handle without a comparator
object.

**Complexity:** O(n log n) time, O(n) space for the sorted copy.
