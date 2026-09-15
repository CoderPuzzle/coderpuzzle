# Solutions — Divide Array Into Arrays With Max Difference

Grouping after sorting is forced: once the values are ordered, the only
question is where the three-element groups break, and the smallest value
in the array has to share its group with two values no larger than it plus
k.

## Sort, then group consecutive triples

Sort nums and walk it in steps of three. For a sorted triple the widest
spread is last minus first, so a group is valid exactly when
sorted[i + 2] - sorted[i] <= k; if any consecutive triple violates that,
the answer is an empty array. The check is also complete — if the sorted
consecutive grouping fails, no valid division exists: the global minimum
belongs to some group whose other two members are then at most it plus k,
which forces those two to be the next two sorted values, and repeating the
argument on the remaining suffix shows every valid division must group
consecutive sorted values. When every triple passes, the consecutive
groups are the answer, and the statement accepts any valid division, of
which this greedy's grouping is one.

Sorting dominates at O(n log n) time, and the groups are the input reused
as output rows, so extra space is O(n) for the sorted copy (or the output
itself). Values stay at most 10⁵, well inside every language's 32-bit
integers, and JavaScript's Number is exact for the same reason.

**Complexity:** `O(n log n)` time, `O(n)` space.
