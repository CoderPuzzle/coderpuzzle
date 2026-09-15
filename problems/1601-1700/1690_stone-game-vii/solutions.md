# Solutions — Stone Game VII

Each move removes one of the two ends, so the only thing that distinguishes
one position of this game from another is the contiguous run of stones still
in the row. Removing a stone never banks its own value — the award is the sum
of what it leaves behind — so a position is priced entirely by which stones
remain and who moves next. Alice maximizes the final difference and Bob
minimizes it, and both players face exactly that alternating choice on every
turn.

## Interval DP on the score difference

Define `dp[l][r]` as the best margin — the mover's final total minus the
opponent's — achievable on `stones[l..r]` when both play optimally. Whose
turn it is needs no separate state: whoever is about to move is the mover,
and both players want the same thing from their own side of the table, so
Alice's maximization and Bob's minimization collapse into one rule. Taking
the left stone scores `sum(l+1..r)` and hands `stones[l+1..r]` to the
opponent, whose best margin there becomes the taker's deficit, for a net
`sum(l+1..r) - dp[l+1][r]`; taking the right stone nets
`sum(l..r-1) - dp[l][r-1]` by the mirror argument, and the mover keeps
whichever net is larger. A lone stone is the base — removing it scores
nothing, so `dp[l][l] = 0` — and prefix sums turn every segment sum into one
subtraction.

Filling `l` descending and `r` ascending leaves both one-stone-shorter runs
ready, and the answer is `dp[0][n-1]`. Bob's minimization is already inside
the recurrence: after Alice banks a segment sum, the sign flips through the
subtraction, so the opponent's best margin is subtracted rather than added.
With `n <= 1000` stones of value at most `1000`, segment sums reach `10⁶` and
every margin stays far inside the 32-bit range, while the `10⁶`-entry table
costs a few megabytes.

**Complexity:** `O(n²)` time, `O(n²)` space.
