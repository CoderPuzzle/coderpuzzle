# Solutions — Find the Winning Player in Coin Game

## Forced moves and parity

A turn must total exactly 115 using coins worth 75 and 10, so a move is
`75a + 10b = 115` for non-negative counts `a`, `b`. Dividing by 5 gives
`15a + 2b = 23`: the left side's parity forces `a` odd, and `a >= 2` already
exceeds the right side, so `a = 1` and `b = 4` is the only solution. That
uniqueness is what collapses the game: "both players play optimally" has
nothing to choose between, because every state admits at most one legal pick,
and it removes exactly one 75-coin and four 10-coins. No alternative line of
play exists to consider, so no player can steer the game shorter or longer.

The game is therefore a countdown of forced moves from `(x, y)`: play
continues while both resources last, which happens exactly
`min(x, floor(y / 4))` times. Whoever faces that count exhausted loses — if
the count is zero Alice cannot make even the first move and Bob wins
immediately; otherwise the mover of the last turn takes the win. Alice moves
on turns 1, 3, 5, ..., so she makes the final move precisely when the move
count is odd.

With `x, y <= 100` the count never leaves [0, 100] and every intermediate is
tiny, so nothing ever approaches the 32-bit limit; the whole algorithm is one
parity test on `min(x, y / 4)`.

**Complexity:** `O(1)` time, `O(1)` space.
