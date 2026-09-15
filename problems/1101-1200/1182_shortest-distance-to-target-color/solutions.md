# Solutions — Shortest Distance to Target Color

## Two Sweeps of Carried Distances

Answering a query by scanning outward from `i` is correct but repeats the
same walking work for every query that lands nearby. The fix is to
precompute, once, the distance from every index to every color — a table
of three values per position — after which each query is a single lookup.

The table fills in two linear passes per color. Sweeping left to right,
carry the distance to the most recent sighting of the color: reset it to 0
when the current cell holds the color, grow it by one otherwise. A second
sweep right to left does the same in mirror image, and each cell keeps the
smaller of its two candidates — whichever side owns the closer occurrence.
A color never seen leaves its cells at "infinite", which the query stage
translates to `-1`. Total work no longer depends on how many queries there
are: two sweeps over the array plus constant time apiece.

**Complexity:** `O(3n)` sweeps for preprocessing — `O(n)` time, `O(n)`
space for the distance table; each of the `q` queries then answers in
`O(1)`, for `O(n + q)` overall.
