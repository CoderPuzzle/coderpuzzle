# Solutions — Find the Largest Area of Square Inside Two Rectangles

## Pairwise intersection clamp

The intersection of two axis-aligned rectangles is itself an axis-aligned
rectangle: on each axis it runs from the higher of the two bottom edges to
the lower of the two top edges. If that span is not strictly positive on
both axes, the rectangles never truly overlap — touching along an edge or
at a corner leaves no room for any square.

When the intersection measures `w` by `h` with both positive, the largest
axis-aligned square inside it has side `min(w, h)`: the tighter dimension
bounds it from below and above, and a square of exactly that side fits by
sitting in a corner of the intersection. So each overlapping pair
contributes the square of `min(w, h)`, and the answer is the largest such
contribution over all pairs, or 0 when no pair overlaps.

Checking every pair is quadratic work over at most 1000 rectangles — about
half a million cheap integer clamps. Areas reach `(10^7 - 1)^2`, well past
32-bit range, so fixed-width languages accumulate in 64-bit integers;
JavaScript numbers stay exact here because the maximum area is far below
2^53.

**Complexity:** `O(n²)` time, `O(1)` space.
