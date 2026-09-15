# Solutions — Maximum Number of Visible Points

## Sort angles, then slide a window

Points sitting exactly at `location` are visible no matter how you rotate,
so they are counted separately and removed from consideration. For every
remaining point the code computes the polar angle from `location` to that
point with `atan2(dy, dx)`, converts it to degrees, and normalizes it into
`[0, 360)`. Rotating your field of view only ever brings a _contiguous_
run of these sorted angles into view at once, because the view is a
single arc of width `angle`.

To find the best run, the sorted angle list is duplicated with 360 added
to every copy and appended to the original, which turns the circular
wraparound (a window that straddles 0/360) into an ordinary contiguous
range on a doubled line. A two-pointer sliding window then walks the
doubled list: the right pointer advances while the window's span stays
within `angle` degrees (using a small epsilon so an angle that lands
exactly `angle` degrees from the window's start still counts, per the
inclusive field-of-view range in the statement), and the window's size is
tracked at every step. The answer is the largest window found, plus the
count of points located exactly at `location`.

**Complexity:** `O(n log n)` time, `O(n)` space.
