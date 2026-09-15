import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public double separateSquares(int[][] squares) {
        int n = squares.length;
        // compressed x-coordinates (square left and right edges)
        long[] raw = new long[2 * n];
        for (int i = 0; i < n; i++) {
            raw[2 * i] = squares[i][0];
            raw[2 * i + 1] = squares[i][0] + (long) squares[i][2];
        }
        Arrays.sort(raw);
        long[] xs = new long[2 * n];
        int m = 0;
        for (int i = 0; i < raw.length; i++) {
            if (i == 0 || raw[i] != raw[i - 1]) {
                xs[m++] = raw[i];
            }
        }
        Map<Long, Integer> index = new HashMap<>();
        for (int i = 0; i < m; i++) {
            index.put(xs[i], i);
        }

        // y-sweep events: square bottom (+1) and top (-1)
        long[][] events = new long[2 * n][4];
        for (int i = 0; i < n; i++) {
            long x = squares[i][0],
                y = squares[i][1],
                l = squares[i][2];
            events[2 * i] = new long[] { y, x, x + l, 1 };
            events[2 * i + 1] = new long[] { y + l, x, x + l, -1 };
        }
        Arrays.sort(events, (a, b) -> Long.compare(a[0], b[0]));

        int[] count = new int[4 * m];
        long[] cover = new long[4 * m];

        // Pass 1: record every positive-width band and accumulate the total
        // covered (union) area — exact integer arithmetic throughout.
        List<long[]> bands = new ArrayList<>(); // {y0, y1, width, areaBefore}
        long total = 0;
        int k = 0;
        while (k < events.length) {
            long y = events[k][0];
            while (k < events.length && events[k][0] == y) {
                update(xs, index, count, cover, 1, 0, m - 1, events[k][1], events[k][2], (int) events[k][3]);
                k++;
            }
            if (k < events.length) {
                long width = cover[1];
                if (width > 0) {
                    long y1 = events[k][0];
                    bands.add(new long[] { y, y1, width, total });
                    total += width * (y1 - y);
                }
            }
        }

        // Pass 2: the first band whose end reaches half of the total contains
        // the balance line; only here do we divide.
        long area = 0;
        for (long[] band : bands) {
            long after = area + band[2] * (band[1] - band[0]);
            if (2 * after >= total) {
                return band[0] + (total - 2 * area) / (2.0 * band[2]);
            }
            area = after;
        }
        return 0.0; // unreachable: at least one square covers positive area
    }

    private void update(
        long[] xs,
        Map<Long, Integer> index,
        int[] count,
        long[] cover,
        int node,
        int lo,
        int hi,
        long x1,
        long x2,
        int delta
    ) {
        int i = index.get(x1),
            j = index.get(x2);
        if (j <= lo || hi <= i) {
            return;
        }
        if (i <= lo && hi <= j) {
            count[node] += delta;
        } else {
            int mid = (lo + hi) / 2;
            update(xs, index, count, cover, 2 * node, lo, mid, x1, x2, delta);
            update(xs, index, count, cover, 2 * node + 1, mid, hi, x1, x2, delta);
        }
        if (count[node] > 0) {
            cover[node] = xs[hi] - xs[lo];
        } else if (hi - lo == 1) {
            cover[node] = 0;
        } else {
            cover[node] = cover[2 * node] + cover[2 * node + 1];
        }
    }
}
