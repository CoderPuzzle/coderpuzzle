# Solutions — Recover the Original Array

## Test candidate differences from the smallest value

Sort `nums`. Its smallest value must be a lower value, so pair it in turn with each larger value whose difference is positive and even; half that difference is a candidate `k`. Test candidates in increasing difference order. For one candidate, repeatedly take the smallest unused value as a lower value and remove one copy of the value `2k` larger. Every successful pair contributes their midpoint to the recovered array.

If all values pair successfully, the midpoints are already sorted and form a valid answer. The first successful candidate uses the smallest feasible `k`; its first midpoint is therefore smallest, which implements the deterministic lexicographic rule.

**Complexity:** `O(n² + n log n)` expected time and `O(n)` auxiliary space.
