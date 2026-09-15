# Solutions — Maximum Height of a Triangle

## Simulate Both Starting Colors

The triangle is filled contiguously from the top: row `k` needs exactly `k`
balls, all one color, and every row must differ in color from its two
neighbors. The color pattern is therefore forced once the top row's color
is chosen — it simply alternates — and the first level whose required count
exceeds the remaining balls of its side ends the structure. Nothing is
gained by stopping earlier or reordering rows: the height only grows while
every level can still be paid for.

So simulate each of the two orientations — red on top or blue on top — with
a plain level loop that subtracts each row's size from the side currently
owing a ball, and return the taller of the two runs. The loop terminates by
row 20 at the latest because `1 + 2 + … + 19 = 190` already exceeds the 200
balls the constraints allow, and every intermediate value stays far inside
32 bits. Example 1 plays out as blue-red-blue: rows of 1, 2, and 3 fit
inside `blue = 4`, `red = 2` leaving nothing for a fourth row, so the
height is 3.

**Complexity:** `O(√(red + blue))` time, `O(1)` space.
