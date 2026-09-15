class Solution {

    public boolean canReachCorner(int xCorner, int yCorner, int[][] circles) {
        // Nodes 0..n-1 are the circles, then the top, right, bottom, and
        // left edges of the rectangle. Touching circles merge into obstacle
        // blobs, and a blob pinned to two edges blocks the corner-to-corner
        // path exactly for the pairs left-right, left-bottom, right-top,
        // and top-bottom: spanning walls cut the rectangle in half, while
        // the other two pairs fence off the start and goal corners. A
        // circle covering a corner touches both adjacent edges at once.
        int n = circles.length;
        int top = n,
            right = n + 1,
            bottom = n + 2,
            left = n + 3;
        int[] parent = new int[n + 4];
        for (int node = 0; node < n + 4; ++node) {
            parent[node] = node;
        }
        for (int i = 0; i < n; ++i) {
            // Coordinates reach 1e9, so squared distances leave 32-bit
            // range; every product below runs in long, exact for them.
            long cx = circles[i][0];
            long cy = circles[i][1];
            long radius = circles[i][2];
            if (meetsEdge(cx, cy, radius, yCorner, false, xCorner, yCorner)) {
                union(parent, top, i);
            }
            if (meetsEdge(cx, cy, radius, xCorner, true, xCorner, yCorner)) {
                union(parent, right, i);
            }
            if (meetsEdge(cx, cy, radius, 0, false, xCorner, yCorner)) {
                union(parent, bottom, i);
            }
            if (meetsEdge(cx, cy, radius, 0, true, xCorner, yCorner)) {
                union(parent, left, i);
            }
            for (int j = 0; j < i; ++j) {
                long dx = cx - circles[j][0];
                long dy = cy - circles[j][1];
                long rr = radius + circles[j][2];
                if (dx * dx + dy * dy <= rr * rr) {
                    union(parent, i, j);
                }
            }
        }
        return (
            find(parent, left) != find(parent, right) &&
            find(parent, left) != find(parent, bottom) &&
            find(parent, right) != find(parent, top) &&
            find(parent, top) != find(parent, bottom)
        );
    }

    private boolean meetsEdge(long cx, long cy, long radius, long fixed, boolean vertical, long xCorner, long yCorner) {
        long px = vertical ? fixed : Math.max(0L, Math.min(cx, xCorner));
        long py = vertical ? Math.max(0L, Math.min(cy, yCorner)) : fixed;
        return (cx - px) * (cx - px) + (cy - py) * (cy - py) <= radius * radius;
    }

    private int find(int[] parent, int node) {
        while (parent[node] != node) {
            parent[node] = parent[parent[node]];
            node = parent[node];
        }
        return node;
    }

    private void union(int[] parent, int a, int b) {
        parent[find(parent, a)] = find(parent, b);
    }
}
