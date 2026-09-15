import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int[][] wallsAndGates(int[][] rooms) {
        int m = rooms.length;
        int n = rooms[0].length;
        final int INF = 2147483647;
        // Invert the search: enqueue every gate at once and run one BFS
        // outward, rather than searching from each empty room.
        Deque<int[]> queue = new ArrayDeque<>();
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (rooms[r][c] == 0) {
                    queue.offer(new int[] { r, c });
                }
            }
        }
        int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        int dist = 0;
        while (!queue.isEmpty()) {
            // Expand one whole layer per step: every distance-d cell is
            // found before any d+1 cell is labeled, which is what keeps
            // distances minimal (first reach = shortest path from a gate).
            dist++;
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                int[] cur = queue.poll();
                for (int[] d : dirs) {
                    int nr = cur[0] + d[0];
                    int nc = cur[1] + d[1];
                    // Still INF means unvisited; writing the distance doubles
                    // as the visited mark, and walls/gates never match INF
                    // so they are never entered or overwritten.
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && rooms[nr][nc] == INF) {
                        rooms[nr][nc] = dist;
                        queue.offer(new int[] { nr, nc });
                    }
                }
            }
        }
        return rooms;
    }
}
