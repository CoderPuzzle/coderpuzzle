# Solutions — Max Points on a Line

## Per-anchor slope counting

Fix one point as an anchor and every other point on a common line with it shares the same direction from it, so the largest such line through the anchor is 1 plus the biggest bucket of equal directions — and taking the maximum over all anchors answers the question. Only points after the anchor need to be bucketed: the best line is counted in full when the anchor is its earliest point, because every other member then comes later in the array.

The direction between anchor `(x0, y0)` and point `(x1, y1)` is the pair `dx = x1 - x0`, `dy = y1 - y0`, reduced to lowest terms by their gcd and then sign-flipped when `dx < 0`, or `dx == 0` and `dy < 0`, so that opposite readings of one line collapse onto a single key — every vertical line becomes `(0, 1)`, every horizontal one `(1, 0)`. Exact integers throughout are the point of the normalization: a floating-point slope like `dy / dx` repeats and compares unreliably, and two different directions can truncate to the same double, while a reduced integer pair cannot collide.

With `points.length <= 300` the double loop visits fewer than 45,000 pairs and each bucket update is constant time, so the whole scan is trivially fast. Coordinates bounded by `10⁴` keep every difference and every reduced pair far inside 32-bit range.

**Complexity:** `O(n²)` time, `O(n)` space for one anchor's direction map at a time.
