# Solutions — Merge Adjacent Equal Elements

The leftmost-pair rule reads as if it demands repeated whole-array rescans,
with cascades erupting behind every merge point. In fact the leftmost equal
pair can only ever sit at the boundary between a settled prefix and the
unread suffix, so one left-to-right sweep settles everything.

## Stack sweep with leftward cascade

Keep a stack of settled elements that never itself contains an adjacent
equal pair. When the incoming value differs from the top, nothing anywhere
can merge yet — push it and move on. When it equals the top, the pair
(top, incoming) is exactly the leftmost equal pair of the entire current
array, because every pair strictly left of the top is already settled
unequal; merging them replaces the top with their sum, and the merge can
only create a fresh pair between that sum and the element beneath it. So
keep popping and adding while the running sum equals the new top — this
inner loop is precisely the cascade behind the merge point that the rule
replays — then push the settled sum and continue the scan. The final
stack, read bottom to top, is the answer.

Each element is pushed exactly once and popped at most once, so the inner
while loop's work is prepaid by earlier pushes and the whole sweep is
linear despite the nesting. Nothing recursive happens, so no language
risks stack depth on `n = 10⁵`; every language keeps the loop iterative
naturally.

Width is the one real trap: a merged element can absorb the entire array,
so sums reach `n × max(nums) = 10⁵ × 10⁵ = 10¹⁰`, well past 32-bit range.
The stack therefore holds 64-bit integers in every typed language (`long`,
`long long`, `int64`, `i64`); Python ints are unbounded, and `10¹⁰ < 2⁵³`
keeps JavaScript's doubles exact, so `number` needs no BigInt. The stack
itself is the only extra storage.

**Complexity:** `O(n)` time, `O(n)` space.
