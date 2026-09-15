# Solutions — Display Table of Food Orders in a Restaurant

## Count pairs, then lay out the sorted grid

The customer names are decoration: everything the display table holds is
a count of `(table, foodItem)` pairs. One pass over `orders` fills a map
keyed by table with an inner map of food to quantity, while a set
collects the distinct food names. Nothing is sorted yet — the grid is
materialized only after the data is fully counted.

Layout is then mechanical. The column order is the alphabetically sorted
food set (the header row prepends "Table"), and the row order is the
table numbers sorted numerically — parsing each table number to an
integer for the sort key matters, because a plain string sort would put
"10" before "3". Each table row walks the sorted food list and prints
its count, defaulting to 0 where the pair never occurred, so every row
has exactly the header's width. All values travel as strings, matching
the expected wire format.

Counting is `O(n)`; the grid write is `O(T · F)` for `T` tables and `F`
foods plus the two sorts, comfortably inside the `5 · 10⁴` order bound
since `T <= 500`.

**Complexity:** `O(n + T log T + F log F + T · F)` time, `O(T · F)`
space for the grid.
