# Solutions — Longest Winning Streak

## Group consecutive wins by the gaps-and-islands trick

Wins form runs, and runs can be numbered without any recursion: order each
player's matches by day and subtract, from the position within the whole
per-player timeline, the position within that result's own run. For a
contiguous block of wins the two numbers advance in lockstep, so their
difference is constant across the block — that constant is a group id
that survives interruptions (a draw or loss restarts it).

Grouping by `(player_id, streak_id)` over the win rows counts every
streak's length, and `MAX` per player picks the longest. Players with no
win at all produce no groups, so the final select seeds one row per player
from the distinct ids and left-joins the streak totals, defaulting to 0.

The follow-up changes exactly one predicate: filtering on
`result IN ('Win', 'Draw')` instead of `'Win'` renumbers the islands as
unbeaten runs while everything else stays put.

**Complexity:** `O(M log M)` time for the window sorts over `M` matches,
`O(M)` space.
