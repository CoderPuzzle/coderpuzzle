class Solution {

    private long[] seg;
    private int size;

    public int[] leftmostBuildingQueries(int[] heights, int[][] queries) {
        int n = heights.length;
        // Max segment tree over heights, padded to a power of two: leaves hold
        // heights, each parent the max of its children.
        size = 1;
        while (size < n) {
            size <<= 1;
        }
        seg = new long[2 * size];
        for (int i = 0; i < n; i++) {
            seg[size + i] = heights[i];
        }
        for (int i = size - 1; i >= 1; i--) {
            seg[i] = Math.max(seg[2 * i], seg[2 * i + 1]);
        }

        int[] result = new int[queries.length];
        // Movements only go rightward and strictly upward in height.
        for (int q = 0; q < queries.length; q++) {
            int a = queries[q][0];
            int b = queries[q][1];
            if (a > b) {
                int tmp = a;
                a = b;
                b = tmp;
            }
            if (a == b) {
                result[q] = a;
            } else if (heights[a] < heights[b]) {
                result[q] = b;
            } else {
                // The taller building sets the bar both must clear strictly
                // right of b; find the leftmost one above it.
                long threshold = Math.max(heights[a], heights[b]);
                result[q] = findFirst(1, 0, size, b + 1, n, threshold);
            }
        }
        return result;
    }

    // First index in [ql, qr) whose height exceeds threshold, or -1.
    private int findFirst(int node, int nl, int nr, int ql, int qr, long threshold) {
        // Prune any node outside the query range or whose max cannot qualify.
        if (nr <= ql || qr <= nl || seg[node] <= threshold) {
            return -1;
        }
        if (nr - nl == 1) {
            return nl;
        }
        int mid = (nl + nr) >>> 1;
        // Left child first, so the first leaf reached is the leftmost hit.
        int res = findFirst(2 * node, nl, mid, ql, qr, threshold);
        if (res != -1) {
            return res;
        }
        return findFirst(2 * node + 1, mid, nr, ql, qr, threshold);
    }
}
