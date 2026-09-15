# Solutions — Stone Game III

## Bottom-up game DP on score difference

Let `dp[i]` be the best achievable value of (current player's score minus opponent's score) for the suffix starting at pile `i`. This single quantity encodes the whole zero-sum game: when the current player takes piles `i..j` for a combined `take`, the opponent then plays optimally on the suffix `j + 1` and earns a difference of `dp[j + 1]` over the original player, so the mover's net is `take - dp[j + 1]`. The player maximizes over the three allowed moves (1, 2, or 3 piles), giving `dp[i] = max(take_j - dp[j + 1])`.

The recurrence is evaluated backwards from `i = n - 1` down to 0, with `dp[n] = 0` as the empty-suffix base — whoever faces an empty row scores nothing more. Each position tries at most three cut points `j` (clamped to the end of the row), accumulating `take` incrementally so every state is constant work. Filling backwards guarantees `dp[j + 1]` is already known when `dp[i]` needs it, replacing memoized recursion with a flat array.

Alice moves first, so `dp[0]` is her optimal score difference over Bob: positive means "Alice" wins, negative means "Bob", zero means "Tie". Negative pile values are handled without special casing — a player facing a trailing block of negative piles may still be forced to take some of them, and the maximization automatically picks the least damaging number of piles (including taking one bad pile to hand the rest over).

Edge cases: short rows with fewer than three piles limit the inner loop via `min(i + 3, n)`, and a single pile resolves to its sign directly.

**Complexity:** `O(n)` time, `O(n)` space.
