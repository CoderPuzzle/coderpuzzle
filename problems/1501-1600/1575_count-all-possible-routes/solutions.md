# Solutions — Count All Possible Routes

## Memoized DP over (city, fuel remaining)

Since every position in `locations` is distinct, moving between any two
different cities always spends at least one unit of fuel, so no
`(city, remaining fuel)` pair is ever revisited with the same amount of
fuel left — the search over these pairs is finite and can be memoized
directly. Define `routesFrom(city, remaining)` as the number of distinct
route continuations starting at `city` with `remaining` fuel left. A
continuation may stop right there, which only counts as a valid route
when `city` is `finish`, and it may also carry on to any other city `j`
whose edge cost `|locations[city] - locations[j]|` does not exceed
`remaining` — every such extension is a distinct route, contributing
`routesFrom(j, remaining - cost)` more ways. These two possibilities are
independent and additive, so `routesFrom(city, remaining)` is `1` (if
`city == finish`, else `0`) plus the sum over all valid neighbors `j` of
`routesFrom(j, remaining - cost)`, taken modulo `10^9 + 7`. The answer is
`routesFrom(start, fuel)`.

This is exactly why the statement's examples show routes that pass
through `finish` and keep going, or leave and come back to it: reaching
`finish` never forces the recursion to stop, it only makes the current
partial route eligible to be counted as complete, while every longer
extension that also ends at `finish` is counted separately. With
`locations.length <= 100` and `fuel <= 200`, there are at most
`100 * 201` distinct states, and each does `O(n)` work to consider every
neighbor, so the whole search is cheap even though the raw route count
itself can be exponential in the unmemoized recursion tree.

**Complexity:** `O(n^2 * fuel)` time, `O(n * fuel)` space, where
`n = locations.length`.
