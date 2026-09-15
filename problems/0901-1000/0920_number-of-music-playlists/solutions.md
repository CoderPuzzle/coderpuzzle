# Solutions — Number of Music Playlists

A prefix of a playlist is pinned down for counting purposes by just two
numbers — its length and how many distinct songs it has played — and the
window rule happens to price the very next play from those two numbers alone,
so a table over the pair multiplies out to the whole count.

## Dynamic program on playlist length and distinct songs

Let `dp[i][j]` count the valid playlists of length `i` that use exactly `j`
distinct songs. The `i`-th play is one of two moves. Introducing a song not
yet used leaves `n - (j - 1)` choices, so each `dp[i-1][j-1]` playlist
extends in `n - j + 1` ways. Repeating a used song is where `k` binds: a used
song is blocked exactly when its last play sits among the last `k` positions,
and those `k` plays are pairwise distinct — two occurrences of one song fewer
than `k` apart would already break the window — so exactly `min(k, j)` of the
`j` used songs are ineligible and `max(0, j - k)` remain. Together
`dp[i][j] = dp[i-1][j-1] * (n - j + 1) + dp[i-1][j] * max(0, j - k)`, seeded
`dp[0][0] = 1`; the answer is `dp[goal][n]`.

Two closed forms anchor the recurrence. When `goal = n` no play can be a
repeat, the second term never fires, and the chain of first terms collapses
to `n!` — every playlist of length `n` using all `n` songs is a permutation,
whatever `k` is. When `k = 0` the window never blocks anything and the count
of onto sequences of length `goal` over `n` songs appears: the surjection sum
`sum_i (-1)^i C(n, i) (n - i)^goal`.

Row `i` reads only row `i - 1`, so the table collapses to one rolling row of
`n + 1` cells, rebuilt per length with `j` capped at `min(i, n)` — `dp[i][j]`
is zero beyond `i` distinct songs. Each cell multiplies two numbers already
below the modulus by factors of at most `n`, so products reach about
`2 · (10^9 + 6) · 100 ≈ 2·10^11`: beyond 32-bit, far inside the 64-bit
accumulation of the fixed-width solutions, reduced modulo `10^9 + 7` at every
write. Python's integers are unbounded, and the JavaScript and TypeScript
products stay exact far below `2^53`. At the bound `goal = n = 100` the fill
is `10^4` cells.

**Complexity:** `O(goal·n)` time, `O(n)` space.
