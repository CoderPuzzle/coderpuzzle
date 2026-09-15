# Solutions — Rectangle Area

## Inclusion-exclusion over the shared rectangle

The covered total is `areaA + areaB - overlap`: whatever the two rectangles share is the only thing counted twice, so subtracting it once leaves every covered unit square counted exactly once. Both areas are a width-times-height product of the corner coordinates, and the overlap is itself a rectangle — its x-span runs from the outermost left edge `max(ax1, bx1)` to the innermost right edge `min(ax2, bx2)`, and likewise for y.

The overlap spans are computed first and inspected before use: if either is zero or negative the projections miss on that axis, the rectangles share nothing (they may still touch along an edge or a single corner), and the answer is simply the sum of the two areas. Testing both spans for strict positivity is what separates a true overlap from a zero-area brush — a shared edge gives an x-span of exactly 0 with a positive y-span, and clamping `max(0, ...)` on each span separately would produce the same subtraction of 0, but the explicit branch states the geometry.

Degenerate rectangles cost nothing special: a zero width or height zeroes that rectangle's own area and drives one overlap span to 0, so the formula degenerates gracefully. Every port stays in 32-bit range — coordinates are bounded by ±10⁴, so each width and height is at most 2·10⁴, each rectangle's area at most 4·10⁸, and even the unsubtracted intermediate `areaA + areaB` peaks at 8·10⁸, all comfortably below 2³¹.

**Complexity:** `O(1)` time, `O(1)` space.
