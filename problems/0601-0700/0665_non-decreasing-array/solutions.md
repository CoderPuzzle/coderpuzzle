# Solutions — Non-decreasing Array

## Greedy repair of the first descent

One modification touches a single element, and an element sits in at most
two adjacent pairs, so a fix can ever absorb descents at one spot. Scan
left to right counting positions where `nums[i] < nums[i - 1]`: a second
descent dooms the array immediately. Even two back-to-back descents
around one element are hopeless — repairing both with a single value `v`
needs `nums[i - 1] <= v <= nums[i + 1]`, but the descents give
`nums[i - 1] > nums[i] > nums[i + 1]`, an empty window — and descents
farther apart only add problems.

At the first descent, pick the repair that never hurts the comparisons
still to come. Lowering `nums[i - 1]` onto `nums[i]` is the gentler move:
it leaves `nums[i]` untouched and as small as possible for the pair
ahead, and it is legal exactly when the pair behind tolerates it — `i == 1`
or `nums[i - 2] <= nums[i]`. Only when lowering would break that earlier
pair must `nums[i]` be raised to `nums[i - 1]`, pushing a larger value
forward. `[4,2,3]` lowers the leading 4 onto 2 and finishes clean;
`[4,2,1]` meets a second descent and fails; `[3,4,2,3]` is the trap —
lowering the 4 would sit under the leading 3, raising the 2 would tower
over the trailing 3, so whichever repair the rule picks, the count
reaches two.

The scan works on the array itself, patching the one neighborhood it
visits, so nothing is kept beyond the count and the current pair. Arrays
of length 1 or 2 always pass — one modification always suffices there —
and the loop sees at most a single pair before agreeing.

**Complexity:** `O(n)` time, `O(1)` space.
