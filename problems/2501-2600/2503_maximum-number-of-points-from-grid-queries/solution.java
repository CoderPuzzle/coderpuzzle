import java.util.PriorityQueue;

class Solution {

    public int[] maxPoints(int[][] grid, int[] queries) {
        int m = grid.length,
            n = grid[0].length;
        int qlen = queries.length;
        // A query q scores exactly the cells reachable from (0,0) through
        // values < q; that set only grows with q, so answer queries in
        // ascending order against one shared frontier.
        Integer[] order = new Integer[qlen];
        for (int i = 0; i < qlen; i++) order[i] = i;
        java.util.Arrays.sort(order, (a, b) -> Integer.compare(queries[a], queries[b]));
        int[] answer = new int[qlen];
        boolean[][] visited = new boolean[m][n];
        visited[0][0] = true;
        // Min-heap frontier keyed by cell value; the start cell is marked
        // visited up front so it must be earned by the pop loop like any other.
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> {
            if (a[0] != b[0]) return Integer.compare(a[0], b[0]);
            if (a[1] != b[1]) return Integer.compare(a[1], b[1]);
            return Integer.compare(a[2], b[2]);
        });
        heap.add(new int[] { grid[0][0], 0, 0 });
        int count = 0;
        int[] dr = { 1, -1, 0, 0 };
        int[] dc = { 0, 0, 1, -1 };
        for (int idx : order) {
            int q = queries[idx];
            // Pop while the cheapest frontier cell is strictly below q: this
            // is Dijkstra-like expansion in value order, one point per cell.
            while (!heap.isEmpty() && heap.peek()[0] < q) {
                int[] top = heap.poll();
                int r = top[1],
                    c = top[2];
                count += 1;
                for (int d = 0; d < 4; d++) {
                    int nr = r + dr[d],
                        nc = c + dc[d];
                    if (0 <= nr && nr < m && 0 <= nc && nc < n && !visited[nr][nc]) {
                        // Mark at push time: no duplicate entries, so each
                        // cell enters and leaves the heap exactly once.
                        visited[nr][nc] = true;
                        heap.add(new int[] { grid[nr][nc], nr, nc });
                    }
                }
            }
            // Heap min >= q (or empty): nothing further is reachable for this
            // or any smaller remaining query, so `count` answers this index.
            answer[idx] = count;
        }
        return answer;
    }
}
