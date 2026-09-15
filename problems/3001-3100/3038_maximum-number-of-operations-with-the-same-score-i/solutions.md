# Solutions — Maximum Number of Operations With the Same Score I

## Consume pairs while the score matches

The first operation is not a choice: it always deletes `nums[0]` and
`nums[1]`, and its score fixes the target every later operation must repeat.
So the answer is one for that operation plus the length of the run of
consecutive pairs after them whose sums equal that score.

Walk the remaining positions two at a time, counting each pair whose sum
still matches. The first mismatch stops everything — once an operation
cannot be performed, no further operation can restore the streak — and an
odd leftover element ends the scan on its own.

**Complexity:** `O(n)` time, `O(1)` space.
