# Solutions — Numbers With Same Consecutive Differences

An integer of length `n` qualifies when its digits, read left to right, walk in
steps of exactly `k` between neighbors: each digit is the one before it moved
up or down by `k`. The walk must start on `1..9` — a leading zero is not an
integer — and never step outside `0..9`, which bounds the family tightly: nine
possible roots, at most two continuations per position. The answer set is small
everywhere in the constraints (the widest case, `n = 9, k = 1`, holds 1556
numbers), so enumerating it directly is already optimal.

## Grow prefixes breadth-first

Start a queue with the nine legal first digits and run `n - 1` rounds; each
round replaces the queue by every one-digit continuation of its members. A
prefix ending in digit `d` may only continue with `d - k` or `d + k` — any
other next digit would already break the rule at that pair — and a
continuation outside `0..9` is dropped immediately. When `k = 0` the two
continuations name the same digit, and it is taken once.

Each round touches exactly one adjacent pair of the finished number and
preserves the rule there, so after the last round every queue entry is an
`n`-digit integer satisfying the rule at every pair; the nonzero seeds keep
leading zeros out of all descendants, since growth only appends digits.
Duplicates are impossible: queue entries are distinct numbers, and the two
continuations of one entry differ unless `k = 0`, which the single-child rule
covers — so the final queue is exactly the answer set.

Seeds enter in ascending order and each continuation pair is emitted with the
lower digit first, so the level-by-level output already comes out ascending;
the final sort states the pinned order in code instead of leaning on that
argument. The walk itself visits fewer than 4,600 prefixes in total across the
whole bounds — a constant — so with `R` the number of results, the sort is the
only super-linear step.

**Complexity:** `O(R log R)` time, `O(R)` space.
