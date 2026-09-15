# Solutions — Maximum Subarray Sum After Multiplier

## Four-state Kadane

Scan left to right with four states. `none` is the best non-empty subarray
that has not started an operation. `multiply` and `divide` are best subarrays
that currently include the operated subarray and end at the current element.
`done` is the best subarray after the operation has already finished.

Transitions allow starting the operation at any element and ending it before
any later element. The final answer is the maximum over all states.

**Complexity:** `O(n)` time, `O(1)` space.
