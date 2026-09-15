# Solutions — Find the Number of Ways to Place People II

## Sort by x, sweep with a bounded y-window

Sort the points by x ascending, breaking x-ties by y descending. Fix an
upper-left anchor `points[i]` and sweep the later indices `j`; every point
before `i` is then provably outside any fence anchored there (an earlier
point either has a smaller x or, sharing x, sits strictly above the
anchor), and every potential blocker of a pair `(i, j)` — any point inside
or on the closed rectangle — must itself lie at an index strictly between
`i` and `j`.

The sweep maintains one value: `window`, the tallest y-coordinate seen so
far that does not exceed `points[i][1]`. A candidate `B = points[j]` with
`B.y <= points[i][1]` completes a valid pair exactly when `window < B.y`,
because blockers are precisely the in-between points whose y falls in the
closed range `[B.y, points[i][1]]`, and `window` is the maximum of that
range's lower-cut seen so far. Each candidate is therefore judged in
constant time and folded into `window` on the spot; candidates whose y
exceeds the anchor can be neither Bob nor a blocker and are skipped
entirely.

**Complexity:** `O(n²)` time, `O(1)` extra space beside the sort.
