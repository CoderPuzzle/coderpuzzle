# Solutions — Maximum Number of Removal Queries That Can Be Processed I

## Window DP over survivors

Replacing nums with a subsequence once at the start is just deleting any
subset up front, and a play only ever consumes that subset from its two
ends. So track a window `nums[l:r]` of the original array: let
`dp[l][r]` be the most queries processable while every element of that
window survives. The window starts as the whole array (`dp[0][n] = 0`) and
shrinks one index per step — an index leaves either silently (the op
deleted it before processing began) or by serving the next query in order,
which needs the leaving end to be `>= queries[processed so far]`.

Filling windows from full down to empty makes each state an O(1) max over
"inherit silently" and "serve from either parent end", so checking the
parent's stored maximum against the next query never loses an optimum:
when a longer parent play exists, silent inheritance already carries that
count forward. Processing stops at the first failure exactly because serve
steps advance one query at a time, and any nonempty survivor block can be
added to the op's deletion set, so the answer is the best empty-window
value `max(dp[i][i])` — both ends qualifying is covered by taking the max
over both parents.

**Complexity:** `O(n^2)` time, `O(n^2)` space.
