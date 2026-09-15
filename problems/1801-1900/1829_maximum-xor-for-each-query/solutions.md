# Solutions — Maximum XOR for Each Query

Each query maximizes `prefix XOR k` over the `k < 2^maximumBit` range, and
every element of `nums` is itself inside that range, so the prefix XOR never
leaves it either. That bounded alphabet is the whole problem: on a range of
the form `[0, 2^maximumBit)`, the maximum reachable value is
`mask = 2^maximumBit - 1`, exactly the first hint's observation.

## Flip the prefix into the mask

For a fixed prefix `p`, the map `k -> p XOR k` is a bijection on
`[0, 2^maximumBit)`, so the maximizing `k` is uniquely `mask XOR p` —
choosing `k` as the bitwise complement of the prefix inside the active bits
sets every one of them to `1`. No search over `k` is needed; each query is
one XOR, which is the second hint read as a formula.

The queries shrink the array from the right, and XOR is self-canceling, so
the prefix for query `i + 1` is the previous prefix with the removed element
XORed back out. The method folds all elements once into a running total,
then walks `nums` backward emitting `running XOR mask` and canceling the
current tail element — `n` XORs to build, `n` pairs to answer, nothing
recomputed. Query order falls out naturally: the first answer, for the full
array, is emitted first.

Every value in play is below `2^20`, so 32-bit arithmetic carries all seven
ports without widening; the answers land in `[0, 2^maximumBit)` by
construction, as the statement requires of `k`.

**Complexity:** `O(n)` time, `O(n)` space for the output (`O(1)` beyond
it), where `n` is the length of `nums`.
