# Solutions — Maximum Subarray Sum After Multiplier

## Four-state Kadane

Scan left to right with four states. `none` is the best non-empty subarray
that has not started an operation. `multiply` and `divide` are best subarrays
that currently include the operated subarray and end at the current element.
`done` is the best subarray after the operation has already finished.

Transitions allow starting the operation at any element and ending it before
any later element. The final answer is the maximum over all states.

![The four-state strip for nums=[1,-2,3,4,-5], k=2 fills left to right; the ×2 span covers [3,4] and the multiply state peaks at 6+8=14.](figures/solution-four-state-kadane-strip.svg)

**Complexity:** `O(n)` time, `O(1)` space.
