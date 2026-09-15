# Solutions — Team Dominance by Pass Success

## A teams × halves scaffold, left-joined to each passer's passes

Every team needs a dominance figure for both halves, including zero-pass
halves, so the query builds the full row space first: `Teams` cross
joined with a two-row `(1, 2)` halves relation. Onto that scaffold each
team's own passes are attached with a LEFT JOIN on `pass_from` guarded
by the half window — stamps up to `'45:00'` land in half 1, anything
later in half 2 — and a correlated lookup fetches the receiver's team.
Timestamps are fixed-width zero-padded strings, so the boundary test is
a plain lexicographic comparison.

One conditional aggregate then produces the score: untouched
(left-null) scaffold rows contribute `0`, a pass to a teammate adds
`1`, and an interception subtracts `1`. GROUP BY collapses the scaffold
to one row per team per half and ORDER BY emits them by team name and
half number. Teams that never passed still survive the LEFT JOIN as
zero rows, so the result always covers every team in both halves.

**Complexity:** `O(P + T log P)` time, `O(T)` space — `P` passes and
`T` teams.
