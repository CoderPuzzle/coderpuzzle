import java.util.*;

class Solution {

    public int[] getOrder(int[][] tasks) {
        int n = tasks.length;
        Integer[] byEnqueue = new Integer[n];
        for (int i = 0; i < n; i++) {
            byEnqueue[i] = i;
        }
        // Indices pre-sorted by (enqueueTime, index): the arrival stream only moves forward.
        Arrays.sort(byEnqueue, (a, b) ->
            tasks[a][0] != tasks[b][0] ? Integer.compare(tasks[a][0], tasks[b][0]) : Integer.compare(a, b)
        );
        // Min-heap ordered by (processingTime, index).
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) ->
            a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1])
        );
        int[] order = new int[n];
        long time = 0;
        int i = 0,
            out = 0;
        while (i < n || !heap.isEmpty()) {
            if (heap.isEmpty()) {
                // CPU idle: jump straight to the next arrival instead of ticking.
                time = Math.max(time, tasks[byEnqueue[i]][0]);
            }
            // Enqueue everything available at this instant BEFORE popping, so all
            // contenders compete under the same (processingTime, index) order.
            while (i < n && tasks[byEnqueue[i]][0] <= time) {
                int j = byEnqueue[i];
                heap.add(new int[] { tasks[j][1], j });
                i++;
            }
            int[] top = heap.poll(); // winner: shortest processing time, smallest index on ties
            order[out++] = top[1];
            time += top[0]; // clock advances by exactly the winner's duration
        }
        return order;
    }
}
