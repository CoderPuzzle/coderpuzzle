import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public int minimumVisitedCells(int[][] grid) {
        // Every move goes strictly right or down, so row-major order is a
        // topological order: when a cell is reached its distance is final.
        // Two lazy min-heaps answer "nearest predecessor" in O(log n):
        // rows[i] holds {dis, k} for cells settled in row i and cols[j]
        // likewise down column j. Entries whose reach no longer covers the
        // current index pop forever — the scan index only ever grows — so
        // the surviving head is the best available source from that side.
        int m = grid.length;
        int n = grid[0].length;
        final int INFINITY = Integer.MAX_VALUE;
        int[][] dis = new int[m][n];
        for (int[] row : dis) {
            Arrays.fill(row, INFINITY);
        }
        dis[0][0] = 1;
        List<PriorityQueue<long[]>> rows = new ArrayList<>();
        List<PriorityQueue<long[]>> cols = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            rows.add(new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0])));
        }
        for (int j = 0; j < n; j++) {
            cols.add(new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0])));
        }
        rows.get(0).add(new long[] { 1, 0 });
        cols.get(0).add(new long[] { 1, 0 });
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) {
                    continue;
                }
                PriorityQueue<long[]> rowHeap = rows.get(i);
                while (!rowHeap.isEmpty() && grid[i][(int) rowHeap.peek()[1]] + rowHeap.peek()[1] < j) {
                    rowHeap.poll();
                }
                PriorityQueue<long[]> colHeap = cols.get(j);
                while (!colHeap.isEmpty() && grid[(int) colHeap.peek()[1]][j] + colHeap.peek()[1] < i) {
                    colHeap.poll();
                }
                long nearest = Math.min(
                    rowHeap.isEmpty() ? INFINITY : rowHeap.peek()[0],
                    colHeap.isEmpty() ? INFINITY : colHeap.peek()[0]
                );
                if (nearest != INFINITY) {
                    dis[i][j] = (int) (nearest + 1);
                    rowHeap.add(new long[] { nearest + 1, j });
                    colHeap.add(new long[] { nearest + 1, i });
                }
            }
        }
        return dis[m - 1][n - 1] == INFINITY ? -1 : dis[m - 1][n - 1];
    }
}
