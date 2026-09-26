# Solutions — Find Good Days to Rob the Bank

## Directional monotone run lengths

Scan left to right to record, for every day, how many consecutive non-increasing steps end there. Scan right to left to record how many consecutive non-decreasing steps start there.

![With security [5,3,3,3,5,6,2] and time 2, the non-increasing counts 0,1,2,3,0,0,1 and non-decreasing counts 0,4,3,2,1,0,0 both reach 2 only on days 2 and 3.](figures/solution-monotone-run-counts.svg)

A day is eligible exactly when both counts are at least `time`; those inequalities also guarantee enough days exist on both sides. Inspecting indices in order naturally produces an increasing answer.

**Complexity:** `O(n)` time and `O(n)` space.
