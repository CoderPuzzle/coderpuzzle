# Solutions — Maximum Area Rectangle With Point Constraints I

## Brute-force corner quadruples

Four points form an axis-aligned rectangle exactly when, among them, there
are two distinct x values and two distinct y values: the four `(x, y)`
combinations built from those values then each hold one of the points (they
are distinct and there are four of them), so the points are precisely the
corners, and the area is the product of the x-span and the y-span. That
observation turns the search into a plain enumeration of every quadruple of
points — at most `C(10, 4) = 210` for `n <= 10` — keeping a candidate only
when it uses exactly two x values and two y values.

Each surviving candidate must also be empty: every point other than the
four corners has to lie outside the closed box `[x1, x2] x [y1, y2]`,
because the statement forbids points inside or on the border. That is a
linear scan over the remaining points per candidate, and a point that is
itself a corner of a larger blocked rectangle does not stop it from being a
corner of a smaller valid one — the scan judges each quadruple
independently. The maximum area over all empty quadruples is the answer,
with `-1` when no candidate survives. Areas are at most `100 * 100 = 10^4`,
comfortably inside 32-bit range.

**Complexity:** `O(n^5)` time (`C(n, 4)` quadruples times an `O(n)` scan),
`O(1)` extra space.
