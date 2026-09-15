# Solutions — Ones and Zeroes

## Two-Dimensional 0/1 Knapsack

Only each string's shape matters — how many `'0'`s and `'1'`s it contains — so the first step reduces every string to a pair `(zeros, ones)`. Selecting the largest subset under a budget of at most `m` zeros and `n` ones is then a 0/1 knapsack with two resource dimensions: `dp[i][j]` is the most strings pickable using at most `i` zeros and `j` ones, and each string is an item that consumes exactly its two counts and is worth one pick.

Strings are processed one at a time against a single `(m+1) x (n+1)` table. For each string, both budget axes are iterated downward, and the code caches `row = dp[i]` with `prev = dp[i - zeros]` so the update `row[j] = max(row[j], prev[j - ones] + 1)` reads the _previous_ string's values: because `i` decreases, the row `i - zeros` is always read before this string's pass rewrites it. The downward iteration is what enforces 0/1 semantics — no string can contribute to the state it is about to be read from — while the inner `cand > row[j]` guard makes taking the string optional when it does not improve the count.

No explicit base case is needed since the all-zero table already describes picking nothing, and strings whose zero or one count exceeds a budget simply skip those cells via the loop bounds `range(m, zeros - 1, -1)`. After all `l` strings are folded in, `dp[m][n]` answers the question directly: it is the optimum under budgets that are upper bounds, so smaller-usage subsets are covered by larger-budget cells. Counting characters adds a one-time linear pass over the input, negligible beside the knapsack itself.

**Complexity:** `O(l·m·n)` time, `O(m·n)` space.
