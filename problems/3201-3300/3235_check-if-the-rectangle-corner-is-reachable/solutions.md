# Solutions — Check if the Rectangle Corner Is Reachable

## Union-find circles together with the four rectangle edges

Give every circle a node, plus four more for the top, right, bottom, and left
edges of the rectangle. Union two circles when their centers lie at most the
sum of the radii apart, and join a circle to an edge when its center lies
within its radius of that edge's segment. Every test is a comparison of
squared distances between integer coordinates, so exact tangencies are
decided without any floating point.

A blob of touching circles can separate the two corners in exactly four ways,
one per forbidden pair. A blob pinned to the left and right edges, or to the
top and bottom edges, spans a wall the corner-to-corner path must cross; a
blob pinned to the left and bottom edges fences the start corner into a
pocket whose remaining walls are boundary strips the path may not touch, and
a blob on the right and top edges does the same to the goal corner. These are
complete: pockets around the other two corners leave both endpoints free,
a circle that never meets the rectangle is inert, and a circle covering a
corner touches both neighboring edges at once, so it is reported by the same
unions. The answer is false exactly when one of the pairs left-right,
left-bottom, right-top, or top-bottom ends up connected.

**Complexity:** `O(n² α(n))` time and `O(n)` space for `n` circles.
