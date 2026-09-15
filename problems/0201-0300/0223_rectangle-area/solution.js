/**
 * @param {number} ax1
 * @param {number} ay1
 * @param {number} ax2
 * @param {number} ay2
 * @param {number} bx1
 * @param {number} by1
 * @param {number} bx2
 * @param {number} by2
 * @return {number}
 */
var computeArea = function (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
    // Inclusion-exclusion: the covered total is both areas minus their
    // intersection, since everything outside the intersection is
    // already counted exactly once.
    const areaA = (ax2 - ax1) * (ay2 - ay1);
    const areaB = (bx2 - bx1) * (by2 - by1);
    // The intersection of two axis-aligned rectangles is itself one: its
    // x-span runs from the outermost left edge to the innermost right
    // edge, and likewise for y. A negative span on either axis means the
    // projections miss and no rectangle is shared at all.
    const overlapW = Math.min(ax2, bx2) - Math.max(ax1, bx1);
    const overlapH = Math.min(ay2, by2) - Math.max(ay1, by1);
    if (overlapW > 0 && overlapH > 0) {
        return areaA + areaB - overlapW * overlapH;
    }
    // Disjoint rectangles, or ones merely touching along an edge or a
    // corner, share zero area and need no subtraction.
    return areaA + areaB;
};
