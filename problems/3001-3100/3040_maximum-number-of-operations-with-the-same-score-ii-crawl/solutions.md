# Solutions — Maximum Number of Operations With the Same Score II

## Three candidate scores, interval DP

The first operation deletes one of three pairs — the two head elements, the
two tail elements, or the two end elements — and its sum pins the score every
later operation must repeat, so only those three candidate scores ever need
to be tried.

For a fixed score, every play lives inside a contiguous window: deleting the
first two, the last two, or both ends just moves a boundary inward, and each
operation shrinks the window by exactly two elements, so only widths sharing
the starting parity ever occur. A layer rolled over those widths holds, for
each left endpoint, the longest chain of operations with that score inside
the window; each entry takes the best move whose deleted pair sums to the
score, worth one plus the entry of the window the move produces. The answer
is the best chain over the three candidate scores.

![On nums = [3,2,1,2,3,4] with candidate score 5 the interval-DP window [0..5] shrinks by two elements per move — first two 3+2, then both ends 1+4, then both ends 2+3 — so dp[0..5] = 1 + dp[2..5] = 3, while score 7 reaches only 1.](figures/solution-window-shrink-chain.svg)

**Complexity:** `O(n²)` time, `O(n)` space.
