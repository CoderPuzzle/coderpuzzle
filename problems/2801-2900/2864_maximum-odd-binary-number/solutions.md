# Solutions — Maximum Odd Binary Number

## Parity fixes the last bit

An odd binary number must end in `1`, so exactly one of the string's ones
is pinned to the final position. Every remaining one then does most good
at the front: placing all of them first, followed by all the zeros, and
closing with the reserved trailing one yields the lexicographically — and
numerically — largest arrangement the multiset of digits permits.

Counting the ones once determines the whole layout.

**Complexity:** `O(n)` time, `O(n)` space for the constructed result.
