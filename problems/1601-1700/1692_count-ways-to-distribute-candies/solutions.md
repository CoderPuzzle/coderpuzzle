# Solutions — Count Ways to Distribute Candies

Distributing `n` labeled candies into `k` unlabeled nonempty bags is the
textbook set-partition count — at `n = 1000` the raw number carries hundreds
of digits. But a distribution is built one candy at a time, and that walk
turns the whole enumeration into a small table of residues.

## Add candies one at a time

Let `dp[i][j]` count the ways to distribute the first `i` candies into
exactly `j` nonempty bags, and split every such distribution by what the bag
holding candy `i` looks like. Either that bag already held an earlier candy —
delete candy `i` and a distribution of `i - 1` candies into `j` still-nonempty
bags remains, with candy `i` free to have joined any of those `j` bags,
contributing `j * dp[i - 1][j]` — or candy `i` sits alone in its bag, in which
case deleting that bag leaves `i - 1` candies in `j - 1` bags and there is no
choice at all, contributing `dp[i - 1][j - 1]`. So
`dp[i][j] = j * dp[i - 1][j] + dp[i - 1][j - 1]`, with
`dp[0][0] = 1` and zeros elsewhere; the answer is `dp[n][k]`. The two cases
are exhaustive and disjoint, and because bags are unordered, "open a new bag"
carries no identity to choose — the count never double-counts the `k!`
labelings of the same partition, which is exactly what makes this recurrence
count distributions rather than assignments to labeled slots.

Row `i` reads only row `i - 1`, and column `j` never exceeds `min(i, k)`, so
two arrays of `k + 1` residues carry the whole table. Every stored value sits
below `10⁹ + 7 < 2^30` while the multiplier `j` stays at or below `1000 < 2^10`,
so `j * dp[i - 1][j] + dp[i - 1][j - 1]` never reaches `2^41` — the
fixed-width languages compute it in 64-bit registers with room to spare,
JavaScript's doubles stay inside their `2^53`-exact integer range, and
Python's plain integers skip the question entirely. The boundary rows behave
as the sanities demand: `dp[n][n] = 1`, `dp[n][1] = 1`, and
`dp[n][2] = 2^(n - 1) - 1`, each candy beyond the first either sharing the
first candy's bag or not.

**Complexity:** `O(n * k)` time, `O(k)` space.
