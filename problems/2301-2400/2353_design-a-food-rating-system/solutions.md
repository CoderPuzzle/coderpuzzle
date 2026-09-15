# Solutions — Design a Food Rating System

## Cuisine Maps with Lazy Min-Heaps

The state splits cleanly in two: a map from each food to `(cuisine, current
rating)`, and a per-cuisine ranking of its foods. Only the second part needs
structure — and the required order, "highest rating first, ties to the
lexicographically smaller name", is exactly the natural minimum of the pair
`(-rating, name)`, so a plain min-heap of such pairs ranks a cuisine with no
custom comparison logic at all.

Keeping that heap correct under `changeRating` is the classic difficulty:
heaps cannot delete arbitrary entries. The `FoodRatings` class does not try.
Every rating change pushes a fresh `(-newRating, food)` entry and leaves the
old one behind as garbage; an entry is considered stale whenever its rating
disagrees with the food's current rating in the first map. `highestRated`
then peeks the top and pops while it is stale — a valid top is never
consumed, so answering the query never disturbs the ranking, and each pushed
entry is discarded at most once, amortizing the cleanup into the pushes.

A tie re-rated to its own value is harmless: duplicates of a valid pair
resolve to the same answer. The Java canonical solution stores heap entries
as `{-rating, foodId}` with ids into a name table (comparing names only on
rating ties); the Python one stores `(-rating, food)` tuples directly.

**Complexity:** `O(log n)` per `changeRating`, `O(log n)` amortized per
`highestRated` query, `O(n)` space.
