# Solutions — Remove One Element to Make the Array Strictly Increasing

Exactly one element may be deleted, so the answer turns on the array's
first "dip" — the first index where the climb breaks — and whether one
deletion can paper over it. One pass with a virtual removal decides
without ever building a new array.

## One pass with a virtual removal

Walk the array carrying `prev`, the last value a survivor chain would
hold. The first time `nums[i] <= prev`, one of exactly two candidates
must be the deletion: `nums[i-1]` or `nums[i]`. Deleting `nums[i-1]` is
legal only when the chain still rises through the gap — `i == 1`, or
`nums[i-2] < nums[i]` — in which case `prev` advances to `nums[i]`.
Otherwise the greedy keeps the old `prev`, which is precisely the effect
of virtually deleting `nums[i]`. No third option exists because every
earlier element already fits the chain.

If a second violation appears after the budget is spent, no single
deletion can repair two breaks and the answer is false. When the walk
finishes, the (possibly patched) chain is strictly increasing, so the
answer is true — including the already-increasing case, where the
budget is simply never needed. The whole decision is one comparison per
element and two scalars of state.

**Complexity:** `O(n)` time, `O(1)` space.
