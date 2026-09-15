# Solutions — Find the Maximum Achievable Number

## Close the gap two units at a time

Everything reduces to how fast the gap between the two numbers can close.
Track `gap = x - num`: one operation moves `x` and `num` independently up or
down, so the gap changes by exactly `-2`, `0`, or `+2` each step. Whatever
mix of directions you pick, a single operation shrinks the gap by at most 2 —
that is the hard speed limit the answer lives under.

To maximize `x`, spend every operation shrinking the gap at that full rate:
decrease `x` by 1 while increasing `num` by 1, closing 2 units per step. After
`t` such steps the pair meets exactly when `x` started `2 * t` above `num`, so
the maximum achievable number is `num + 2 * t` — no strategy can beat it,
because nothing ever closes more than 2 units of gap per move. Stopping early
only narrows the reachable set, so "at most `t` times" still spends all `t`
operations.

The examples agree: with `num = 4, t = 1` the answer is `4 + 2 = 6`, and with
`num = 3, t = 2` it is `3 + 4 = 7`.

**Complexity:** `O(1)` time, `O(1)` space.
