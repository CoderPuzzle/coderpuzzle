# Solutions — Distribute Elements Into Two Arrays I

## Literal simulation

The first two operations are fixed: `nums[0]` seeds `arr1` and `nums[1]`
seeds `arr2`. From then on only the two tails matter — each later element
joins whichever array currently ends in the greater value, and that append
updates just the winning tail. Distinctness guarantees the two tails always
differ (every value lives in exactly one of the arrays), so each comparison
is decisive and the process is fully determined.

The code keeps both arrays, scans `nums` once from the third element on,
appends each value to the winner, and returns `arr1` followed by `arr2`,
which is exactly the concatenation the statement asks for.

**Complexity:** `O(n)` time, `O(n)` space.
