import java.util.Arrays;
import java.util.PriorityQueue;

class Solution {

    public int minTimeToReach(int[][] moveTime) {
        // Waiting inside a room is free, but a move into an adjacent room
        // takes exactly one second and cannot start before the target room
        // opens, so a cell settled at time t settles a neighbour at
        // max(t, moveTime[next]) + 1. That relaxation never lowers a
        // settled time, so this is shortest-path terrain for Dijkstra:
        // pop cells from a min-heap of arrival times, skip stale entries,
        // and the first settle of a cell is its final time.
        int n = moveTime.length;
        int m = moveTime[0].length;
        int[][] dist = new int[n][m];
        for (int[] row : dist) {
            Arrays.fill(row, Integer.MAX_VALUE);
        }
        dist[0][0] = 0;
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        heap.add(new int[] { 0, 0, 0 });
        while (!heap.isEmpty()) {
            int[] cur = heap.poll();
            int i = cur[1];
            int j = cur[2];
            if (cur[0] > dist[i][j]) {
                continue;
            }
            int[][] dirs = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
            for (int[] d : dirs) {
                int ni = i + d[0];
                int nj = j + d[1];
                if (ni < 0 || ni >= n || nj < 0 || nj >= m) {
                    continue;
                }
                int nt = Math.max(cur[0], moveTime[ni][nj]) + 1;
                if (nt < dist[ni][nj]) {
                    dist[ni][nj] = nt;
                    heap.add(new int[] { nt, ni, nj });
                }
            }
        }
        return dist[n - 1][m - 1];
    }
}
