import java.util.PriorityQueue;

class Solution {

    public int[] resultsArray(int[][] queries, int k) {
        // Max-heap holding the k smallest distances seen so far; its peek is
        // the current kth nearest once the heap has filled up. Distances reach
        // 2 * 10^9, so they are computed and stored as long even though each
        // coordinate fits an int.
        PriorityQueue<Long> heap = new PriorityQueue<>(java.util.Collections.reverseOrder());
        int[] result = new int[queries.length];
        for (int i = 0; i < queries.length; i++) {
            long d = Math.abs((long) queries[i][0]) + Math.abs((long) queries[i][1]);
            if (heap.size() < k) {
                heap.offer(d);
            } else if (heap.peek() > d) {
                heap.poll();
                heap.offer(d);
            }
            // A distance is at most 2 * 10^9, which fits an int exactly.
            result[i] = heap.size() == k ? heap.peek().intValue() : -1;
        }
        return result;
    }
}
