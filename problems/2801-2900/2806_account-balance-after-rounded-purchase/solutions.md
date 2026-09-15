# Solutions — Account Balance After Rounded Purchase

## Add five, then floor to tens

Everything reduces to computing `roundedAmount` without searching for it.
Adding 5 to `purchaseAmount` and then flooring to a multiple of 10 does the
whole job in one expression: `(purchaseAmount + 5) / 10`, floored, counts
how many complete tens fit into the amount once it has been nudged halfway
to the next one, and multiplying back by 10 restores the multiple scale.
The final balance is just `100` minus that value.

The nudge is precisely the stated tie rule. Split `purchaseAmount` into its
multiple-of-10 prefix and a ones digit `d`. For `d` of 0–4, adding 5 cannot
reach the next ten, so the floor keeps the lower multiple — the nearer one.
For `d` of 6–9 it crosses the boundary and selects the upper multiple —
again the nearer one. When `d` is exactly 5 the two neighboring multiples
are equidistant, and the nudged amount lands squarely on the upper one: the
larger candidate, which is what the problem demands (15 becomes 20, not
10).

Subtracting from 100 finishes. The constraints keep every intermediate
non-negative — `purchaseAmount + 5` never exceeds 105, and the rounded
value stays within 0–100 — so the same one-line expression is safe in each
offered language, with no reliance on how negative division or modulo
rounds. The answer spans the full range: a purchase of 0 rounds away
nothing and leaves 100, while anything from 95 through 100 rounds to 100
and empties the account.

**Complexity:** `O(1)` time, `O(1)` space.
