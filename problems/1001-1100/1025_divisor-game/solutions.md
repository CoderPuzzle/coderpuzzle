# Solutions — Divisor Game

## Bottom-up divisor-move DP

Treat each value `i` on the board as a game position: `win[i]` is true if
the player about to move at `i` can force a win. `win[0]` is trivially
false (nothing to move from). Build `win` from `i = 1` up to `n`: for
each `i`, try every divisor `x` with `0 < x < i` and `i % x == 0`; taking
that move leaves `i - x` for the opponent, so `i` is a winning position
as soon as some move lands on an opponent position with `win[i - x] ==
false`. If no divisor move reaches a losing position for the opponent,
`win[i]` stays false. The answer is `win[n]`.

Because every reachable position only ever depends on smaller positions
already computed earlier in the same pass, one forward sweep fills the
whole table with no recursion or memo lookups needed.

**Complexity:** `O(n^2)` time, `O(n)` space, where `n` is the starting
number on the chalkboard.
