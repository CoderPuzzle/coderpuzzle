# Solutions — Bitwise OR of Adjacent Elements

## Single pass of adjacent pairwise OR

The answer is defined one element at a time: `answer[i]` depends only on
`nums[i]` and `nums[i + 1]`, so a single scan combines each adjacent pair
with the `|` operator and appends the result. Nothing else changes the
bits — with all values below 128 there is no cross-pair interaction, and
the output length is exactly `n - 1`.

Each element of `nums` participates in two combinations, making the work
linear in the input with constant auxiliary space beyond the output array.

**Complexity:** `O(n)` time, `O(1)` extra space (`O(n)` counting the output).
