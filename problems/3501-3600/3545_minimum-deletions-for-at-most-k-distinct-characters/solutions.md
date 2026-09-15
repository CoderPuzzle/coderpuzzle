# Solutions — Minimum Deletions for At Most K Distinct Characters

## Count frequencies, sacrifice the rarest

Deleting a character only ever removes one letter species entirely or does
nothing useful: a partial deletion keeps the species alive, so any optimal
plan deletes _all_ occurrences of the letters it gives up. The question is
therefore purely which `d` species to sacrifice, where
`d = (number of distinct characters) - k`; if `d <= 0` the string already
complies and the answer is 0.

Greedy settles the choice: the cost of abandoning a species is its full
frequency, and the costs are independent, so sacrificing the `d`
least-frequent letters is optimal — any swap would exchange a smaller cost
for a larger one. Counting the 26 letter frequencies, keeping the nonzero
ones, sorting ascending, and summing the first `d` entries answers the
problem in one sort. With `s` at most 16 characters the whole computation
is tiny, but the argument holds at any scale.

**Complexity:** `O(n + D log D)` time, `O(1)` space (`n = |s|`, `D <= 26`
distinct letters).
