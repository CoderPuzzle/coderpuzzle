# Solutions — Stone Game

## Interval DP on the score difference

Each move removes one of the two ends, so the only thing that ever
distinguishes one position of this game from another is the contiguous run of
piles still on the table. The two players' totals are complementary, so one
number prices a position: `dp[i][j]` is the best final margin — current
player's total minus the opponent's — achievable on `piles[i..j]` when both
play optimally. Whose turn it is needs no separate state, because the
definition is symmetric: whoever is about to move is the current player, and
each player maximizes the same quantity from their own side of the table.

The lone pile is the base: `dp[i][i] = piles[i]`, the mover takes it and
finishes that far ahead. Longer intervals fold in from both ends — taking the
left pile scores `piles[i]` and leaves `[i+1..j]` to the opponent, whose best
margin there becomes the taker's deficit, for a net `piles[i] -
dp[i+1][j]`; taking the right pile nets `piles[j] - dp[i][j-1]` by the
mirror argument. The mover keeps whichever net is larger. Filling by
increasing interval length has both shorter intervals ready, and the answer
is `dp[0][n-1] > 0`. The total is odd, and a difference of totals has the
same parity as their sum, so the value is never zero — Example 1's
`[5,3,4,5]` resolves to a margin of exactly 1, Alice 9 stones to Bob's 8.

Every entry is a difference of pile sums, and at most 500 piles of at most
500 stones each, so all margins stay far inside the 32-bit range. The even
length carries a famous consequence the table rediscovers on its own: parity
splits the row into two alternating classes, their sums differ because the
total is odd, and Alice can always answer Bob so as to take every pile of
the larger class — so every input the constraints allow is an Alice win.
The DP never assumes that; it prices each row honestly from the rules and
the margin comes out positive.

**Complexity:** `O(n²)` time, `O(n²)` space.
