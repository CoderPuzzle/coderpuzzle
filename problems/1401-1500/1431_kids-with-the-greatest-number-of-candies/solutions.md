# Solutions — Kids With the Greatest Number of Candies

## One maximum, then one comparison per kid

Giving the extra candies to kid `i` changes only kid `i`'s count, so the
"greatest among all the kids" test asks whether `candies[i] +
extraCandies` reaches the maximum of the original array. The maximum is
fixed — one pass computes it — and each kid's verdict is then a single
comparison against it, including the kid who already holds that maximum
(whose augmented count can only be greater or equal, and equality counts
as "greatest" since several kids may share it).

That is the whole algorithm: find `max(candies)` in `O(n)`, then fill
the boolean array with `candies[i] + extraCandies >= maximum`. The naive
alternative — rebuilding the array and re-taking the max for each kid —
is also correct and fits the `n <= 100` bound, but the fixed-maximum
form makes the single-comparison structure explicit and stays linear
whatever the size.

All values stay far below any overflow bound (at most `100 + 50`), so
plain integer arithmetic suffices in every language.

**Complexity:** `O(n)` time, `O(n)` space for the result array.
