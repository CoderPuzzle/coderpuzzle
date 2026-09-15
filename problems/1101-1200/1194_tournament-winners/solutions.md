# Solutions — Tournament Winners

## Union the Two Sides of Every Match, Then Pick per Group

A player's points arrive in two disguises: as `first_score` when listed
first and as `second_score` when listed second. The first stage flattens
that — a `UNION ALL` emits one `(player, points)` event per side of every
match, and a grouped `SUM` over the events yields each scorer's total.
Players who never played appear in no event, which is fine: their total is
zero, handled naturally at the next stage.

The second stage ranks within groups. Joining those totals against
`Players` attaches a group to every score; players absent from the totals
join through a `LEFT JOIN` carrying NULL, and `COALESCE(total, 0)`
normalizes them to zero so an all-idle group still crowns its lowest-id
member. Ranking with the tie rule baked in needs one ordered value:
`ROW_NUMBER() OVER (PARTITION BY group_id ORDER BY total DESC, player_id)`
counts down by points, then by id — exactly "maximum points, lowest id
breaks ties". Row number 1 in each partition is the winner.

**Complexity:** `O(M log M)` for the union-side aggregation over `M` match
sides plus `O(P log P)` for the ranked window over `P` players,
`O(P)` space for the decorated rows.
