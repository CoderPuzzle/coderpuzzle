# Solutions — Calculate Money in Leetcode Bank

The deposit schedule is two rhythms stacked on each other: within a week the
amount climbs by $1 a day, and each Monday the whole ladder restarts one
dollar higher. That makes every week's total an arithmetic sum fixed by its
index alone, so the balance after `n` days collapses into two closed sums —
one over the complete weeks, one over the leftover days.

## Sum the weeks in closed form

Write `n = 7 * w + r` with `0 <= r < 7`. Week `k` (counting from 0) deposits
`(k+1) + (k+2) + ... + (k+7)` — seven amounts rising from `k+1` — which sums
to `7 * (k+1) + 21`. Summing over the `w` complete weeks gives
`7 * (1 + 2 + ... + w) + 21 * w = 7 * w * (w+1) / 2 + 21 * w`, and the `r`
leftover days of the next week deposit `(w+1) + ... + (w+r)`, the `r`-term
arithmetic sum `r * w + r * (r+1) / 2`. Adding the two pieces answers the
question outright: `n = 10` has `w = 1, r = 3`, so the full week contributes
`7 + 21 = 28` and the partial one `3 + 6 = 9` — `37` in total.

Both divisions are exact — `w * (w+1)` and `r * (r+1)` are products of
consecutive integers, hence even — so plain integer arithmetic never rounds,
and at the `n = 1000` bound the answer is `74926`, far inside 32-bit range.

**Complexity:** `O(1)` time, `O(1)` space.
