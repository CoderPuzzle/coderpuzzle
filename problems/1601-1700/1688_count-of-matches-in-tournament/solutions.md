# Solutions — Count of Matches in Tournament

The tournament's rules fix every round's arithmetic in advance: an even field
pairs off into half as many matches, an odd field sits one team out and pairs
the rest. Who wins which pairing never enters the count — each round's
contribution depends only on how many teams remain — so playing the rounds
one by one, with two integer operations apiece, accumulates the answer.

## Play out the rounds

Keep `teams = n` and `matches = 0`. While more than one team remains, the
round plays `teams / 2` matches — an even field plays `n / 2` of them and an
odd field `(n - 1) / 2`, which is the same floor half — and advances
`teams / 2 + teams % 2` teams: the winners, plus the odd team's bye, which is
exactly the two advance counts the statement spells out. Add the first
quantity to the count, replace `teams` with the second, and repeat until one
team is left; `n = 1` never enters the loop and answers `0`. Example 2 is the
loop in full: `14 -> 7 -> 4 -> 2 -> 1` with matches `7 + 3 + 2 + 1 = 13`.

The loop halves the field every round (`teams / 2 + teams % 2` never exceeds
`(teams + 1) / 2`), so it runs at most eight rounds even at the `n = 200`
bound — `200 -> 100 -> 50 -> 25 -> 13 -> 7 -> 4 -> 2 -> 1` — and every value
along the way fits an ordinary machine integer with room to spare.

A backward glance explains the totals the loop accumulates: every match
eliminates exactly one team, a bye eliminates nobody, and the field must lose
`n - 1` teams to shrink from `n` to a single champion — so the answer is
always `n - 1`, whatever shape the rounds take. The simulation remains the
faithful reading (and the one the hints prescribe); the closed form is the
invariant it is quietly accumulating.

**Complexity:** `O(log n)` time, `O(1)` space.
