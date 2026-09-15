import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;
import java.util.PriorityQueue;

class Solution {

    public long minCost(int m, int n, int[][] penalty) {
        final long INF = Long.MAX_VALUE;
        int size = m * n;
        long[][] dist = new long[size][2];
        for (long[] row : dist) Arrays.fill(row, INF);
        dist[0][0] = 1; // entrance cost of (0, 0); next action is odd
        PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> {
            if (a[0] != b[0]) return Long.compare(a[0], b[0]);
            if (a[1] != b[1]) return Long.compare(a[1], b[1]);
            return Long.compare(a[2], b[2]);
        });
        pq.add(new long[] { 1, 0, 0 });
        int target = size - 1;
        int[] di = { 1, -1, 0, 0 };
        int[] dj = { 0, 0, 1, -1 };
        while (!pq.isEmpty()) {
            long[] cur = pq.poll();
            long cost = cur[0];
            int cell = (int) cur[1];
            int parity = (int) cur[2];
            if (cost > dist[cell][parity]) continue;
            if (cell == target) continue;
            int i = cell / n,
                j = cell % n;
            boolean isOdd = parity == 0;
            for (int t = 0; t < 4; t++) {
                int ni = i + di[t],
                    nj = j + dj[t];
                if (!(ni >= 0 && ni < m && nj >= 0 && nj < n)) continue;
                boolean follows = (isOdd && di[t] + dj[t] > 0) || (!isOdd && di[t] + dj[t] < 0);
                long w = (long) (ni + 1) * (nj + 1);
                if (!follows) w += penalty[i][j];
                int ncell = ni * n + nj;
                int nparity = 1 - parity;
                long nc = cost + w;
                if (nc < dist[ncell][nparity]) {
                    dist[ncell][nparity] = nc;
                    pq.add(new long[] { nc, ncell, nparity });
                }
            }
            // wait flips parity at cost penalty[i][j]
            long w = penalty[i][j];
            int nparity = 1 - parity;
            long nc = cost + w;
            if (nc < dist[cell][nparity]) {
                dist[cell][nparity] = nc;
                pq.add(new long[] { nc, cell, nparity });
            }
        }
        return Math.min(dist[target][0], dist[target][1]);
    }
}
