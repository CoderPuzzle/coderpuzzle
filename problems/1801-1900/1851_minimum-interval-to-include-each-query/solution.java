import java.util.*;

class Solution {

    public int[] minInterval(int[][] intervals, int[] queries) {
        int[][] sorted = intervals.clone();
        Arrays.sort(sorted, (a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1]));
        // Sweep queries in ascending order so each interval's life is a contiguous
        // stretch of the sweep: live from its left end, dead past its right end.
        Integer[] order = new Integer[queries.length];
        for (int j = 0; j < queries.length; j++) {
            order[j] = j;
        }
        Arrays.sort(order, (a, b) -> Integer.compare(queries[a], queries[b]));
        // Min-heap of [size, right] pairs ordered by size.
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        int[] answers = new int[queries.length];
        int i = 0;
        int n = sorted.length;
        for (int j : order) {
            int q = queries[j];
            // Intervals whose left end has been reached are now live (size, right).
            while (i < n && sorted[i][0] <= q) {
                heap.add(new int[] { sorted[i][1] - sorted[i][0] + 1, sorted[i][1] });
                i++;
            }
            // Lazy deletion: the top dies past its right end, and since queries only
            // grow it fails every later query too — discarding it is permanent.
            while (!heap.isEmpty() && heap.peek()[1] < q) {
                heap.poll();
            }
            // Surviving top = smallest interval containing q.
            answers[j] = heap.isEmpty() ? -1 : heap.peek()[0];
        }
        return answers;
    }
}
