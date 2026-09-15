# Solutions — Minimum Deletions to Make Array Divisible

## Reduce numsDivide to its GCD, then scan sorted nums once

An element `x` can become the smallest element of the trimmed `nums` only
if it divides every value in `numsDivide`. Rather than testing each
candidate against all of `numsDivide`, collapse the whole requirement into
one number first: a value divides every element of `numsDivide` exactly
when it divides their greatest common divisor. One pass over `numsDivide`
with a running GCD therefore produces a single target that fully encodes
the divisibility condition.

With the target in hand, deletions resolve greedily. Deleting elements
never forces removal of anything larger than necessary — only the elements
smaller than the smallest valid candidate need to go — so sort `nums` and
walk it in ascending order, counting every element that fails to divide
the target and stopping at the first one that succeeds; the count is the
answer. If no element divides the target, no amount of deleting helps and
the answer is `-1`.

Sorting dominates at `O((n + m) log n)` time for `n = len(nums)`,
`m = len(numsDivide)` (the GCD pass is linear), plus `O(n)` space for the
sorted copy.

**Complexity:** `O(n log n + m log max(numsDivide))` time, `O(n)` space.
