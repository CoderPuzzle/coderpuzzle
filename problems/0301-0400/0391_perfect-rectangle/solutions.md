# Solutions — Perfect Rectangle

## Area sum plus corner cancellation

An exact cover announces itself through two independent signatures. The first
is area: the pieces tile their bounding rectangle — the smallest box
`[minX, maxA] x [minY, maxB]` around them — so the sum of the piece areas must
equal the bounding rectangle's area. The test catches overlap and gap jointly:
an overlap inflates the sum above the box, a gap deflates it below. The second
signature is the corners. Toggle each piece's four corners in a set — add a
point when it is absent, remove it when it is already there. In an exact cover
every interior point is a corner of an even number of pieces, two meeting
along a shared edge or four meeting at a cross, so each such point is toggled
away and exactly the four corners of the bounding rectangle survive.

Neither signature suffices alone, and the misses are disjoint. Duplicate one
piece of a 2 x 2 tiling and drop another: the areas still balance at four unit
squares, but the corner set keeps six points, so the balanced sum is exposed.
Conversely, stack two identical rectangles and every corner cancels — the set
is empty, not the box's four — while the area has doubled. A single pass
accumulates the area sum and the coordinate extremes and performs the toggles;
at the end the set must equal the box's four corners and the sums must match,
which together hold exactly when the pieces form the cover.

Both checks are pure arithmetic and hashing over the input, so the pass is
linear. The area sum is the one place the input outgrows 32-bit arithmetic: a
single rectangle spans at most `2 * 10⁵` per side (`4 * 10¹⁰` area), and an
overlapping pile multiplies that further, so the accumulator is 64-bit (a
JavaScript number stays exact well below its `2⁵³` ceiling); the corner set
holds at most `4n` points before cancellation, and each language encodes a
point its own way — a pair in Python, Go, and Rust, a packed `long` in Java,
a packed `long long` in C++, a string key in JavaScript and TypeScript.

**Complexity:** `O(n)` time, `O(n)` space.
