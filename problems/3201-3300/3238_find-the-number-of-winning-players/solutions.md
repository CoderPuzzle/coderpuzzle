# Solutions — Find the Number of Winning Players

## Per-player color tallies

Whether player i wins depends only on their own picks: they win exactly
when some single color occurs at least `i + 1` times among them. One pass
over `pick` therefore settles everything — bump a counter keyed by the
pair `[xi, yi]` as it is read. Colors are bounded by 10, so each player
owns a fixed row of eleven tallies indexed directly by the color, no hash
map needed.

After the pass, scan players `0` through `n - 1` and compare the largest
tally in the player's row with the player's own index: winning means
strictly more than i balls of one color, so the row maximum must reach
`i + 1`. Player 0 wins with any single ball, matching the statement's
reading, while a player who never picked keeps an all-zero row and never
wins.

**Complexity:** `O(pick.length + n)` time, `O(n)` space.
