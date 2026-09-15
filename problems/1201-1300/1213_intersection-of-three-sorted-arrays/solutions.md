# Solutions — Intersection of Three Sorted Arrays

## Three pointers walking the sorted arrays

All three arrays are sorted, so one index per array suffices. Compare the
three current values: when they are all equal, the value belongs to the
intersection and every index advances; otherwise the smallest values can
never catch up later (everything ahead of them is strictly larger), so each
index sitting on a strict minimum moves forward one step.

Because each step consumes one element from some array and the values are
strictly increasing, the shared values are emitted in ascending order — no
extra sort is needed. The scan stops as soon as any array is exhausted, since
no further value can be common to all three.

**Complexity:** `O(n₁ + n₂ + n₃)` time, `O(1)` extra space beyond the output.
