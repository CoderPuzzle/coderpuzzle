# Solutions — Find Maximum Removals From Source String

## Subsequence Dynamic Programming with Removal Rewards

Walk `source` left to right while carrying one number per pattern prefix
length: the most removals achievable so far having matched exactly that many
characters of `pattern`. Each position of `source` offers three moves, and
the table keeps the best of them for every state. Keeping the character
carries a state over unchanged, whether or not the character extends the
match; keeping it when it equals the next pattern character advances state
`k` to `k + 1` at no cost; and when the position is a target index, the
deleted variant adds one removal while leaving the match count alone.

![On source "abbaa" with pattern "aba" and targetIndices [0, 1, 2], the dp table over matched prefix lengths fills column by column — keep, match, or delete (+1 only in the target columns) — and the full-match state k = 3 ends at 1 removal.](figures/solution-dp-removal-table.svg)

Unreachable states start at a very negative sentinel and simply drift along
the bottom of the table — after at most n increments they are still far
below any reachable count of zero or more — so no separate "is this state
live?" bookkeeping is needed. The answer is the final value at state
`|pattern|`, which the constraints guarantee is reachable (`pattern` is a
subsequence of `source`). The table is rolled over two rows of `m + 1`
entries, and both loops are plain iterations, so nothing recurses even at
the 3 × 10³ size limit.

**Complexity:** `O(n * m)` time, `O(m)` space.
