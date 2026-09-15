import java.util.Arrays;
import java.util.PriorityQueue;

class Solution {

    public int minTimeToReach(int[][] moveTime) {
        // Every move flips the parity of i + j, so a walk that has made
        // k moves always stands on a cell with the parity of k — the
        // hint's (cell, move-parity) states collapse onto the cells
        // alone, and the move leaving (i, j) costs 1 when (i + j) is
        // even, else 2. That fixes each cell's outgoing cost, so plain
        // Dijkstra applies: a cell settled at time t offers a neighbour
        // arrival max(t, moveTime[next]) + cost_out(cell), and the
        // first settle is final. Distances are carried in 64-bit longs
        // — moveTime reaches 1e9 and the move sums add ~3000 more.
        int n = moveTime.length;
        int m = moveTime[0].length;
        long[][] dist = new long[n][m];
        for (long[] row : dist) {
            Arrays.fill(row, Long.MAX_VALUE);
        }
        dist[0][0] = 0;
        PriorityQueue<long[]> heap = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
        heap.add(new long[] { 0L, 0L, 0L });
        while (!heap.isEmpty()) {
            long[] cur = heap.poll();
            int i = (int) cur[1];
            int j = (int) cur[2];
            if (cur[0] > dist[i][j]) {
                continue;
            }
            long step = (i + j) % 2 == 0 ? 1L : 2L;
            int[][] dirs = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
            for (int[] d : dirs) {
                int ni = i + d[0];
                int nj = j + d[1];
                if (ni < 0 || ni >= n || nj < 0 || nj >= m) {
                    continue;
                }
                long nt = Math.max(cur[0], (long) moveTime[ni][nj]) + step;
                if (nt < dist[ni][nj]) {
                    dist[ni][nj] = nt;
                    heap.add(new long[] { nt, ni, nj });
                }
            }
        }
        return (int) dist[n - 1][m - 1];
    }
}
