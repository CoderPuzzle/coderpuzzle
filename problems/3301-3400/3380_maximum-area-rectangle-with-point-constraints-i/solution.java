class Solution {

    public int maxRectangleArea(int[][] points) {
        // Enumerate every quadruple. Four distinct points are the corners
        // of an axis-aligned rectangle exactly when they use two distinct x
        // values and two distinct y values — the four (x, y) combos then
        // each hold one of the points. The rectangle survives only if every
        // other point lies outside its closed box; with n <= 10 there are
        // at most C(10,4) = 210 quads, each checked in a linear scan.
        int n = points.length;
        int best = -1;
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                for (int k = j + 1; k < n; ++k) {
                    for (int l = k + 1; l < n; ++l) {
                        int[][] quad = { points[i], points[j], points[k], points[l] };
                        int xCount = 0;
                        int yCount = 0;
                        for (int a = 0; a < 4; ++a) {
                            boolean seenX = false;
                            boolean seenY = false;
                            for (int b = 0; b < a; ++b) {
                                if (quad[b][0] == quad[a][0]) {
                                    seenX = true;
                                }
                                if (quad[b][1] == quad[a][1]) {
                                    seenY = true;
                                }
                            }
                            if (!seenX) {
                                ++xCount;
                            }
                            if (!seenY) {
                                ++yCount;
                            }
                        }
                        if (xCount != 2 || yCount != 2) {
                            continue;
                        }
                        int x1 = Math.min(Math.min(quad[0][0], quad[1][0]), Math.min(quad[2][0], quad[3][0]));
                        int x2 = Math.max(Math.max(quad[0][0], quad[1][0]), Math.max(quad[2][0], quad[3][0]));
                        int y1 = Math.min(Math.min(quad[0][1], quad[1][1]), Math.min(quad[2][1], quad[3][1]));
                        int y2 = Math.max(Math.max(quad[0][1], quad[1][1]), Math.max(quad[2][1], quad[3][1]));
                        if (emptyBox(points, quad, x1, x2, y1, y2)) {
                            best = Math.max(best, (x2 - x1) * (y2 - y1));
                        }
                    }
                }
            }
        }
        return best;
    }

    private boolean emptyBox(int[][] points, int[][] quad, int x1, int x2, int y1, int y2) {
        for (int[] p : points) {
            if (p[0] == quad[0][0] && p[1] == quad[0][1]) {
                continue;
            }
            if (p[0] == quad[1][0] && p[1] == quad[1][1]) {
                continue;
            }
            if (p[0] == quad[2][0] && p[1] == quad[2][1]) {
                continue;
            }
            if (p[0] == quad[3][0] && p[1] == quad[3][1]) {
                continue;
            }
            if (x1 <= p[0] && p[0] <= x2 && y1 <= p[1] && p[1] <= y2) {
                return false;
            }
        }
        return true;
    }
}
