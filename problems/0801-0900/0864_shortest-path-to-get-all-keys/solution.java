import java.util.ArrayDeque;
import java.util.Queue;

class Solution {

    public int shortestPathAllKeys(String[] grid) {
        int m = grid.length;
        int n = grid[0].length();
        int sr = -1,
            sc = -1;
        int target = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                char ch = grid[i].charAt(j);
                if (ch == '@') {
                    sr = i;
                    sc = j;
                } else if (ch >= 'a' && ch <= 'f') {
                    target |= 1 << (ch - 'a');
                }
            }
        }
        int size = 1 << 6;
        int[] dist = new int[m * n * size];
        java.util.Arrays.fill(dist, -1);
        Queue<int[]> queue = new ArrayDeque<>();
        dist[(sr * n + sc) * size] = 0;
        queue.add(new int[] { sr, sc, 0 });
        int[] dr = { 1, -1, 0, 0 };
        int[] dc = { 0, 0, 1, -1 };
        while (!queue.isEmpty()) {
            int[] cur = queue.poll();
            int r = cur[0],
                c = cur[1],
                mask = cur[2];
            if (mask == target) {
                return dist[(r * n + c) * size + mask];
            }
            int d = dist[(r * n + c) * size + mask];
            for (int k = 0; k < 4; k++) {
                int nr = r + dr[k];
                int nc = c + dc[k];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) {
                    continue;
                }
                char ch = grid[nr].charAt(nc);
                if (ch == '#') {
                    continue;
                }
                if (ch >= 'A' && ch <= 'F' && (mask & (1 << (ch - 'A'))) == 0) {
                    continue;
                }
                int nmask = mask;
                if (ch >= 'a' && ch <= 'f') {
                    nmask |= 1 << (ch - 'a');
                }
                int idx = (nr * n + nc) * size + nmask;
                if (dist[idx] == -1) {
                    dist[idx] = d + 1;
                    queue.add(new int[] { nr, nc, nmask });
                }
            }
        }
        return -1;
    }
}
