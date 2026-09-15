import java.util.*;

class Solution {

    // Sweep columns right-to-left. Compress both axes; a candidate
    // rectangle's left edge is two consecutive points (in y order) of one
    // column. The nearest column to the right holding any point with y in
    // [y1, y2] is the only possible right edge: any farther column would
    // keep that nearest point inside or on the border. A min segment tree
    // over compressed y, seeded with column indices as columns are passed,
    // answers "nearest column with a point in y-range [a, b]" as a
    // range-min query. The right column must hold exactly y1 and y2 inside
    // the range (both corners, nothing between or on the border).
    public long maxRectangleArea(int[] xCoord, int[] yCoord) {
        int n = xCoord.length;
        int[] xs = xCoord.clone();
        Arrays.sort(xs);
        int[] ys = yCoord.clone();
        Arrays.sort(ys);
        int m = 0;
        for (int i = 0; i < n; i++) {
            if (i == 0 || xs[i] != xs[m - 1]) {
                xs[m++] = xs[i];
            }
        }
        int[] xu = Arrays.copyOf(xs, m);
        int k = 0;
        for (int i = 0; i < n; i++) {
            if (i == 0 || ys[i] != ys[k - 1]) {
                ys[k++] = ys[i];
            }
        }
        int[] yu = Arrays.copyOf(ys, k);
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) ->
            xCoord[a] != xCoord[b] ? Integer.compare(xCoord[a], xCoord[b]) : Integer.compare(yCoord[a], yCoord[b])
        );
        int[] cx = new int[n];
        int[] cy = new int[n];
        for (int p = 0; p < n; p++) {
            int i = order[p];
            cx[p] = Arrays.binarySearch(xu, xCoord[i]);
            cy[p] = Arrays.binarySearch(yu, yCoord[i]);
        }
        List<int[]> colList = new ArrayList<>();
        int p = 0;
        while (p < n) {
            int q = p + 1;
            while (q < n && cx[q] == cx[p]) {
                q++;
            }
            colList.add(Arrays.copyOfRange(cy, p, q));
            p = q;
        }
        int[][] cols = colList.toArray(new int[0][]);
        int size = 1;
        while (size < k) {
            size *= 2;
        }
        int inf = m;
        int[] tree = new int[2 * size];
        Arrays.fill(tree, inf);
        long best = -1;
        for (int c = m - 1; c >= 0; c--) {
            int[] col = cols[c];
            for (int t = 0; t + 1 < col.length; t++) {
                int a = col[t];
                int b = col[t + 1];
                int res = inf;
                for (int l = a + size, r = b + size + 1; l < r; l >>= 1, r >>= 1) {
                    if ((l & 1) == 1) {
                        res = Math.min(res, tree[l]);
                        l++;
                    }
                    if ((r & 1) == 1) {
                        r--;
                        res = Math.min(res, tree[r]);
                    }
                }
                if (res < inf) {
                    int[] arr = cols[res];
                    int lo = lowerBound(arr, a);
                    int hi = lowerBound(arr, b + 1);
                    if (hi - lo == 2 && arr[lo] == a && arr[lo + 1] == b) {
                        long area = (long) (xu[res] - xu[c]) * (yu[b] - yu[a]);
                        if (area > best) {
                            best = area;
                        }
                    }
                }
            }
            for (int yy : col) {
                int i = yy + size;
                while (i > 0 && tree[i] > c) {
                    tree[i] = c;
                    i >>= 1;
                }
            }
        }
        return best;
    }

    private static int lowerBound(int[] arr, int v) {
        int lo = 0;
        int hi = arr.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (arr[mid] < v) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
