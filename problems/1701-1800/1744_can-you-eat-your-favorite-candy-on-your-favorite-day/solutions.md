# Solutions — Can You Eat Your Favorite Candy on Your Favorite Day?

## Prefix sums bound each query's window

The only thing that matters about the candy types before `favoriteType`
is how many candies they contain in total, so a prefix-sum array `pref`
where `pref[i]` is the total candies in types `0 .. i-1` answers every
query's "when can I reach type `t`" question in constant time.

For a query `(t, day, cap)`, the earliest day a candy of type `t` can be
eaten is `pref[t] // cap`: eating `cap` candies every day clears the
preceding types as fast as the rules allow, and the first candy of type
`t` is reached on that day. The latest day is `pref[t] + candiesCount[t] - 1`,
reached by eating one candy a day, the slowest pace the rules permit. The
query is true exactly when `favoriteDay` lies inside that window:
`pref[t] // cap <= day <= pref[t] + candiesCount[t] - 1`.

Prefix sums reach `10⁵ × 10⁵ = 10¹⁰`, so the accumulated totals must be
held in 64-bit integers even though every individual count fits in 32
bits. With the prefix array built in one pass and each query reduced to
two comparisons, the whole answer is a single linear sweep over the
queries.

**Complexity:** `O(n + q)` time, `O(n)` space.
