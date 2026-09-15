# Solutions — Find Good Days to Rob the Bank

## Directional monotone run lengths

Scan left to right to record, for every day, how many consecutive non-increasing steps end there. Scan right to left to record how many consecutive non-decreasing steps start there.

A day is eligible exactly when both counts are at least `time`; those inequalities also guarantee enough days exist on both sides. Inspecting indices in order naturally produces an increasing answer.

**Complexity:** `O(n)` time and `O(n)` space.
