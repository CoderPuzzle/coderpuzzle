# Solutions — Most Common Course Pairs

Both approaches share one shape and differ only in how the winner is
picked. The shared shape: group the rows by student, judge each student's
qualification with integer arithmetic alone (`sum >= 4 * n` says the
average reaches 4 with no division), order that student's records by
`(date, course)` so ties on a shared date break by name, and tally every
consecutive course pair into a map. What remains is choosing the best key,
and the two approaches part ways there.

## Sort keys, then take the max

The tally map hands back its keys unsorted; sorting them once makes the
choice a linear scan. Walking keys in ascending lexicographic order while
keeping a candidate only on a _strict_ count improvement lands on exactly
the statement's rule: an equal count can never displace an earlier (smaller)
key, so among equal counts the smallest first-course name survives, and its
second-course name breaks any remaining tie because the pairs are sorted
as whole `(first, second)` tuples. The result never depends on hash-map
iteration order — the same input produces the same walk in every language.

The scan costs `O(P)` over `P` distinct pairs plus the `O(P log P)` sort;
grouping and tallying are one pass over the table with per-row constant
work. Working storage holds one small record list per student and one map
entry per distinct consecutive pair.

**Complexity:** `O(n + P log P)` time for `n` rows and `P` distinct pairs,
`O(n + P)` space.

## Bounded sweep with a running best

The same tally, but the choice needs no sort at all when the comparison
carries the ordering inside it. Sweep the map's entries — in whatever
order the hash table yields them — keeping the best entry under the tuple
comparison `(-count, firstCourse, secondCourse)`: a candidate replaces the
champion only when its negated count is smaller (a strictly larger count),
or the counts tie and `(firstCourse, secondCourse)` is strictly smaller.
Because that total order has no ties between distinct keys, every sweep of
the same data ends on the same champion regardless of iteration order.

Each of the `P` entries costs one tuple comparison; nothing is sorted and
no second buffer is needed beyond the running champion. The asymptotics
match the sorted-key variant — both are linear in the table plus near-linear
in the pair count — but this version does strictly less work per entry.

**Complexity:** `O(n + P)` time for `n` rows and `P` distinct pairs under
hash lookup, `O(n + P)` space.
