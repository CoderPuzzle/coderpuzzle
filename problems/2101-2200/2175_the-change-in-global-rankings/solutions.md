# Solutions — The Change in Global Rankings

## Rank each team before and after applying the point changes

Both rankings are one window function over the same ordering rule: points
descending, then name ascending. The "before" ranking reads `TeamPoints`
directly; the "after" ranking first joins each team with its
`points_change` row and adds the delta, then applies the identical
`ROW_NUMBER`. Joining the two ranked copies of every `team_id` puts both
positions side by side, and old minus new is exactly the requested
`rank_diff` (positive means the team moved up).

Because ties are broken by a column that never changes (the name), the
ordering is total and `ROW_NUMBER` is deterministic — no `DENSE_RANK`
ambiguity can leak into the diff.

**Complexity:** `O(T log T)` time for the two window sorts over `T`
teams, `O(T)` space.
