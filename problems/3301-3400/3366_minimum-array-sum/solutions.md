# Solutions — Minimum Array Sum

## Two-Resource Dynamic Programming

Process the array from right to left with a DP over the operations left:
`dp[a][b]` is the smallest achievable sum of the yet-unprocessed suffix
when `a` halving operations and `b` subtraction operations remain. Each
element contributes one of five outcomes — untouched, halved, reduced by
`k`, or both operations in one of the two possible orders — and the
counters drop accordingly, so each state expands in constant time.

The paired case hides the trap: Operation 2's precondition is checked
against the value it actually meets, which depends on the order. With
`value = 5` and `k = 3`, halve-then-subtract reaches `5 -> 3 -> 0`
while subtract-then-halve only reaches `5 -> 2 -> 1`, so both orders
must be tried (each guards its own applicability). Skipping inapplicable
branches keeps every intermediate non-negative; values are bounded by
`10⁵` and `n <= 100`, so all sums fit comfortably in 32-bit integers.

The answer is read off `dp[op1][op2]` after the first element is
processed. The table has `n · op1 · op2 <= 10⁶` states across rolling
layers, and each state does constant work.

**Complexity:** `O(n · op1 · op2)` time, `O(op1 · op2)` space.
