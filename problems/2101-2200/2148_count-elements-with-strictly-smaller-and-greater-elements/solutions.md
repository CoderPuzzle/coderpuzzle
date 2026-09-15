# Solutions — Count Elements With Strictly Smaller and Greater Elements

An element needs a strictly smaller and a strictly greater witness elsewhere in
`nums`, so only the values caught between the array's extremes can ever
qualify — the minimum has nothing below it and the maximum nothing above.

## Count the strict interior

Whether some element is strictly smaller than `x` depends only on `x` exceeding
the array minimum, and dually for the maximum: witnesses exist iff
`min < x < max`. So the answer is simply the number of elements lying strictly
between the two extremes, and one pass computes `min` and `max` while a second
counts the elements between them.

When every element is equal, `min == max`, the strict interval is empty, and
the count falls out as 0 — the degenerate case the naive
`n - count(min) - count(max)` formula would get wrong. Duplicated extremes are
handled naturally too: on `[-3,3,3,90]` both 3s sit strictly inside, giving 2.
The count never exceeds `n <= 100`, so plain machine integers carry it in every
language.

**Complexity:** `O(n)` time, `O(1)` extra space.
