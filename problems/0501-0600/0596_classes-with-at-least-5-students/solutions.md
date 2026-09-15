# Solutions — Classes With at Least 5 Students

## Count the students in each class

A class's enrollment is exactly its rows: every `Courses` row is one
student's enrollment in one class, so `GROUP BY class` gathers each class's
rows into a single group and the group's `COUNT(*)` is literally that
class's headcount. `HAVING COUNT(*) >= 5` keeps the groups of five or more,
and projecting the grouping key `class` emits precisely the classes with at
least five students — one row per surviving class, since grouping never
produces two groups for one key.

The primary key carries the integrity. Because `(student, class)` is
unique, a student cannot double-enroll in one class, so no class's count is
inflated by a repeated row. A student enrolled in several different classes
is not a duplicate either: each of those rows lands in a different group
and counts once for each class, which is exactly what "at least five
students" means. The boundary is inclusive — "at least five" is `>= 5`, so
a class of exactly five qualifies while a class of four falls short — and
counting is order-independent, so the arrangement of the rows never changes
a group's size.

One aggregation pass reads the `N` rows of `Courses` once and materializes
one group per class, `C` of them; the `HAVING` filter runs on those groups
and one row leaves per survivor. Equivalent shapes reach the same rows: a
window `COUNT(*) OVER (PARTITION BY class)` repeats each class's headcount
on every one of its rows and so needs an extra `DISTINCT` before filtering,
and a correlated `(SELECT COUNT(*) FROM Courses c2 WHERE c2.class =
Courses.class) >= 5` states the same test per row — but the grouped
`HAVING` is the whole answer in one clause.

**Complexity:** `O(N)` time, `O(C)` space.
