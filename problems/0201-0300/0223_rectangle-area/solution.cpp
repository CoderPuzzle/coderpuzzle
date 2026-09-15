class Solution {
  public:
    int computeArea(int ax1, int ay1, int ax2, int ay2, int bx1, int by1, int bx2, int by2) {
        // Inclusion-exclusion: the covered total is both areas minus their
        // intersection, since everything outside the intersection is
        // already counted exactly once.
        int areaA = (ax2 - ax1) * (ay2 - ay1);
        int areaB = (bx2 - bx1) * (by2 - by1);
        // The intersection of two axis-aligned rectangles is itself one:
        // its x-span runs from the outermost left edge to the innermost
        // right edge, and likewise for y. A negative span on either axis
        // means the projections miss and no rectangle is shared at all.
        int overlapW = min(ax2, bx2) - max(ax1, bx1);
        int overlapH = min(ay2, by2) - max(ay1, by1);
        if (overlapW > 0 && overlapH > 0) {
            return areaA + areaB - overlapW * overlapH;
        }
        // Disjoint rectangles, or ones merely touching along an edge or a
        // corner, share zero area and need no subtraction.
        return areaA + areaB;
    }
};
