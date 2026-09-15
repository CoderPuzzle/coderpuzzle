import java.util.*;

class Solution {

    public String findShortestWay(int[][] maze, int[] ball, int[] hole) {
        int m = maze.length,
            n = maze[0].length;
        int hr = hole[0],
            hc = hole[1];
        int[][] dist = new int[m][n];
        for (int[] row : dist) Arrays.fill(row, -1);
        String[][] path = new String[m][n];
        // min-heap of [d, instructions, r, c] ordered by distance, then the
        // instruction string
        PriorityQueue<Object[]> heap = new PriorityQueue<>((a, b) -> {
            int diff = (Integer) a[0] - (Integer) b[0];
            return diff != 0 ? diff : ((String) a[1]).compareTo((String) b[1]);
        });
        // Dijkstra over stopping cells, but the hole is a terminal that
        // captures the ball mid-roll. States carry (distance, instructions)
        // and the heap orders by distance first, string second, so the first
        // time the hole pops, its pair is distance-minimal and, among those,
        // lexicographically minimal.
        dist[ball[0]][ball[1]] = 0;
        path[ball[0]][ball[1]] = "";
        heap.add(new Object[] { 0, "", ball[0], ball[1] });
        int[][] dirs = { { 1, 0 }, { 0, -1 }, { 0, 1 }, { -1, 0 } };
        String[] letters = { "d", "l", "r", "u" };
        while (!heap.isEmpty()) {
            Object[] top = heap.poll();
            int d = (Integer) top[0];
            String p = (String) top[1];
            int r = (Integer) top[2],
                c = (Integer) top[3];
            // Dijkstra settles cells in (distance, instructions) order:
            // hole popped => its pair is final.
            if (r == hr && c == hc) return p;
            // Stale heap entry (cell was already relaxed smaller): skip.
            if (d > dist[r][c] || (d == dist[r][c] && p.compareTo(path[r][c]) > 0)) continue;
            // The "next direction must differ from the last" rule needs no
            // code: the ball stopped against a wall in that direction, so
            // re-choosing it rolls zero cells.
            for (int dir = 0; dir < 4; dir++) {
                int dr = dirs[dir][0],
                    dc = dirs[dir][1];
                // Roll until the next cell is a wall/border — but stepping
                // onto the hole ends the roll right there: the ball drops
                // in instead of rolling on.
                int nr = r,
                    nc = c,
                    steps = 0;
                while (nr + dr >= 0 && nr + dr < m && nc + dc >= 0 && nc + dc < n && maze[nr + dr][nc + dc] == 0) {
                    nr += dr;
                    nc += dc;
                    steps++;
                    if (nr == hr && nc == hc) break;
                }
                if (steps > 0) {
                    int nd = d + steps;
                    String np = p + letters[dir];
                    // Relax on the (distance, instructions) pair.
                    if (
                        dist[nr][nc] == -1 ||
                        nd < dist[nr][nc] ||
                        (nd == dist[nr][nc] && np.compareTo(path[nr][nc]) < 0)
                    ) {
                        dist[nr][nc] = nd;
                        path[nr][nc] = np;
                        heap.add(new Object[] { nd, np, nr, nc });
                    }
                }
            }
        }
        // Heap exhausted: the ball can never reach the hole.
        return "impossible";
    }
}
