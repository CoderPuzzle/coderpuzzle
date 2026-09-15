# Solutions — Circle and Rectangle Overlapping

## Closest point on the rectangle to the circle center

The circle and the rectangle overlap exactly when the rectangle contains
a point whose distance from the circle's center is at most `radius`. If
any such point exists, the one closest to the center is certainly one of
them, so the whole test collapses to computing the distance from the
center to the nearest point of the rectangle and comparing it with
`radius`.

For an axis-aligned rectangle that nearest point is found by clamping
each coordinate of the center into the rectangle's interval: the nearest
x-coordinate is the middle value among `xCenter`, `x1`, and `x2`, and
likewise the nearest y-coordinate is the middle of `yCenter`, `y1`, and
`y2`. Clamping the two coordinates independently is valid precisely
because the rectangle is a box — for any point, the nearest point on an
axis-aligned box is obtained coordinate by coordinate.

When the center lies inside the rectangle both clamps are the identity
and the distance is zero, so the comparison `distance² <= radius²`
succeeds there too; that also covers a center sitting exactly on an edge
or a corner. All arithmetic stays integral: the inputs are integers, and
comparing squared distances avoids both square roots and floating point,
so the answer is exact for every input.

**Complexity:** `O(1)` time, `O(1)` space.
