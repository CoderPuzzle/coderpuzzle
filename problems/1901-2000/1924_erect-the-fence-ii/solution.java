class Solution {

    private boolean inside(double[] circle, double x, double y, double eps) {
        double dx = x - circle[0],
            dy = y - circle[1];
        return dx * dx + dy * dy <= circle[2] + eps;
    }

    // Circle with the two points as diameter: midpoint center, squared radius = d^2/4.
    private double[] from2(double ax, double ay, double bx, double by) {
        double cx = (ax + bx) / 2.0,
            cy = (ay + by) / 2.0;
        double dx = ax - bx,
            dy = ay - by;
        return new double[] { cx, cy, (dx * dx + dy * dy) / 4.0 };
    }

    private double[] from3(double ax, double ay, double bx, double by, double cx, double cy) {
        double d = 2.0 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
        // Zero determinant = collinear, no circumcircle; the best two-point
        // circle among the pairs is the correct enclosing circle.
        if (d == 0.0) {
            double[] best = null;
            double[][] pairs = { from2(ax, ay, bx, by), from2(ax, ay, cx, cy), from2(bx, by, cx, cy) };
            for (double[] c : pairs) {
                if (best == null || c[2] < best[2]) {
                    best = c;
                }
            }
            return best;
        }
        // Circumcenter via the perpendicular-bisector linear system.
        double aa = ax * ax + ay * ay;
        double bb = bx * bx + by * by;
        double cc = cx * cx + cy * cy;
        double ux = (aa * (by - cy) + bb * (cy - ay) + cc * (ay - by)) / d;
        double uy = (aa * (cx - bx) + bb * (ax - cx) + cc * (bx - ax)) / d;
        double dx = ax - ux,
            dy = ay - uy;
        return new double[] { ux, uy, dx * dx + dy * dy };
    }

    public double[] outerTrees(int[][] trees) {
        // Translate by the first tree before converting to floats: small
        // intermediate magnitudes protect the 1e-5 judge tolerance.
        int n = trees.length;
        double ox = trees[0][0],
            oy = trees[0][1];
        double[] xs = new double[n],
            ys = new double[n];
        for (int i = 0; i < n; i++) {
            xs[i] = trees[i][0] - ox;
            ys[i] = trees[i][1] - oy;
        }
        double eps = 1e-7;
        // Welzl's argument: a point outside the current circle must lie ON the
        // border of the corrected circle — fix i and rebuild one level deeper
        // (j escaping fixes a second border point, k escaping fixes all three).
        double[] circle = { xs[0], ys[0], 0.0 };
        for (int i = 1; i < n; i++) {
            if (inside(circle, xs[i], ys[i], eps)) {
                continue;
            }
            circle = new double[] { xs[i], ys[i], 0.0 };
            for (int j = 0; j < i; j++) {
                if (inside(circle, xs[j], ys[j], eps)) {
                    continue;
                }
                circle = from2(xs[i], ys[i], xs[j], ys[j]);
                for (int k = 0; k < j; k++) {
                    if (inside(circle, xs[k], ys[k], eps)) {
                        continue;
                    }
                    circle = from3(xs[i], ys[i], xs[j], ys[j], xs[k], ys[k]);
                }
            }
        }
        return new double[] { circle[0] + ox, circle[1] + oy, Math.sqrt(circle[2]) };
    }
}
