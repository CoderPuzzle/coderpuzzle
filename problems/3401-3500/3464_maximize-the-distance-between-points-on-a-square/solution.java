import java.util.Arrays;

class Solution {

    public int maxDistance(int side, int[][] points, int k) {
        long L = 4L * side;

        int n = points.length;
        long[] coords = new long[n];
        for (int i = 0; i < n; i++) {
            coords[i] = perimeter(side, points[i][0], points[i][1]);
        }
        Arrays.sort(coords);
        long[] arr = new long[2 * n];
        for (int i = 0; i < n; i++) {
            arr[i] = coords[i];
            arr[i + n] = coords[i] + L;
        }

        long lo = 0,
            hi = 2L * side;
        while (lo < hi) {
            long mid = lo + (hi - lo + 1) / 2;
            if (feasible(arr, n, k, mid, L)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return (int) lo;
    }

    private long perimeter(int side, int x, int y) {
        if (y == 0) return x;
        if (x == side) return (long) side + y;
        if (y == side) return 2L * side + (side - x);
        // x == 0
        return 3L * side + (side - y);
    }

    private boolean feasible(long[] arr, int n, int k, long d, long L) {
        if (d == 0) return true;
        int total = 2 * n;
        int[] nxt = new int[total];
        for (int j = 0; j < total; j++) {
            long target = arr[j] + d;
            int lo = j + 1,
                hi = total;
            while (lo < hi) {
                int m2 = (lo + hi) >>> 1;
                if (arr[m2] < target) lo = m2 + 1;
                else hi = m2;
            }
            nxt[j] = lo;
        }
        for (int i = 0; i < n; i++) {
            int cnt = 1;
            int cur = i;
            boolean ok = true;
            for (int t = 0; t < k - 1; t++) {
                int j = nxt[cur];
                if (j >= i + n) {
                    ok = false;
                    break;
                }
                cur = j;
                cnt++;
            }
            if (ok && cnt == k) {
                if (arr[cur] + d <= arr[i] + L) {
                    return true;
                }
            }
        }
        return false;
    }
}
