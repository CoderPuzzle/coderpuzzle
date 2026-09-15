impl Solution {
    pub fn compute_area(ax1: i32, ay1: i32, ax2: i32, ay2: i32, bx1: i32, by1: i32, bx2: i32, by2: i32) -> i32 {
        // Inclusion-exclusion: the covered total is both areas minus their
        // intersection, since everything outside the intersection is
        // already counted exactly once.
        let area_a = (ax2 - ax1) * (ay2 - ay1);
        let area_b = (bx2 - bx1) * (by2 - by1);
        // The intersection of two axis-aligned rectangles is itself one:
        // its x-span runs from the outermost left edge to the innermost
        // right edge, and likewise for y. A negative span on either axis
        // means the projections miss and no rectangle is shared at all.
        let overlap_w = ax2.min(bx2) - ax1.max(bx1);
        let overlap_h = ay2.min(by2) - ay1.max(by1);
        if overlap_w > 0 && overlap_h > 0 {
            area_a + area_b - overlap_w * overlap_h
        } else {
            // Disjoint rectangles, or ones merely touching along an edge
            // or a corner, share zero area and need no subtraction.
            area_a + area_b
        }
    }
}
