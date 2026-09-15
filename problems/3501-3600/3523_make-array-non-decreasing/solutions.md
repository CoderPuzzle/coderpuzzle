# Solutions — Make Array Non-decreasing

## Greedy prefix-high partition

Collapsing a subarray to its maximum means the final array is always the
sequence of segment maxes of some partition of `nums` into consecutive
blocks, and the array is non-decreasing exactly when those block maxes are
non-decreasing. So the task is to partition the array into as many
consecutive blocks as possible whose maxes never decrease. The greedy rule:
sweep left to right, start a new block at every element that reaches the
running maximum of the current prefix (a prefix high, equal values
included), and absorb anything smaller into the current block. The block
count is just the number of prefix highs.

Why the earliest cut is safe: if an optimal solution's first block ends
earlier than the greedy's, extending it to the greedy's cut point does not
change its max — every skipped element is below the prefix high, so it
cannot raise the max — while the second block only ever gains elements,
which can only raise its max, keeping the pair ordered. Repeating the
argument block by block turns any optimal partition into the greedy one.
Absorbing a smaller element into the current block therefore never costs a
later cut, and an element equal to the running maximum can always open a
new block since `>=` suffices. Answers are at most `n <= 2 * 10⁵` and every
value fits 32 bits, so plain integer arithmetic covers the whole input
range in one O(n) pass.

**Complexity:** `O(n)` time, `O(1)` space.
