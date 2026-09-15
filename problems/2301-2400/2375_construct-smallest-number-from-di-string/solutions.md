# Solutions — Construct Smallest Number From DI String

## Stack Reversal over Decreasing Runs

The pattern partitions the positions into blocks: each maximal run of `'D'` characters (terminated by an `'I'` or by the end of the pattern) forms a block of `k + 1` positions whose digits must strictly decrease. Push digits `1, 2, 3, ...` onto a stack while scanning; whenever the scan hits an `'I'` (or the end), pop the entire stack into the result. Since a stack pops in reverse, each block's pool of digits is emitted in descending order, and consecutive pools are consecutive digit ranges because pushes never skip.

![The pattern IIIDIDDD with its output 1 2 3 5 4 9 8 7 6 grouped into blocks: the I-terminated run flushes a stack holding 4 then 5 to emit 5 4, and the final D-run piles 6, 7, 8, 9 and pops them as 9 8 7 6.](figures/solution-di-blocks.svg)

Validity follows from the block structure. Inside a block, consecutive emitted digits strictly decrease, satisfying every `'D'`. At an `'I'` boundary, the last digit emitted for the left block is the smallest digit of its pool, while the first digit of the next block is the largest digit of the next, strictly higher pool — so the required increase holds; when a block has size 1 the same argument applies with that single digit.

Minimality: the positions of the first `b` blocks must hold strictly decreasing digits within each block and increasing values across block boundaries, forcing them to be `b` distinct "chains"; the smallest possible digits for the first block are `1..(k1+1)`, for the second the next consecutive range, and so on. Emitting each block's range in descending order is then forced — the block's first position must be its largest digit — and the stack construction produces exactly this assignment. Hence the output is the lexicographically smallest valid string.

Edge cases: a pattern of all `'I'` flushes after every push, yielding `123...(n+1)`; all `'D'` flushes once at the end, yielding `(n+1)...321`. Each digit `1..n+1` is pushed and popped exactly once, so all digits are distinct and within `1..9` given the length bound.

**Complexity:** `O(n)` time, `O(n)` space for the stack and output.
