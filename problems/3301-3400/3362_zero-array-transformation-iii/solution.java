import java.util.*;

class Solution {

    // Sweep indices left to right with the queries sorted by start; a
    // max-heap by right endpoint holds the queries covering the current
    // index. Whenever the running coverage of already selected queries
    // falls short of nums[i], select the query reaching farthest right
    // and retire its coverage one step past r via a difference array.
    // Return -1 when the heap runs dry on a deficit.
    public int maxRemoval(int[] nums, int[][] queries) {
        Arrays.sort(queries, (a, b) -> Integer.compare(a[0], b[0]));
        PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder());
        int[] delta = new int[nums.length + 1];
        int cover = 0;
        int selected = 0;
        int j = 0;
        for (int i = 0; i < nums.length; i++) {
            cover += delta[i];
            while (j < queries.length && queries[j][0] <= i) {
                heap.offer(queries[j][1]);
                j++;
            }
            while (cover < nums[i]) {
                while (!heap.isEmpty() && heap.peek() < i) {
                    heap.poll();
                }
                if (heap.isEmpty()) {
                    return -1;
                }
                int r = heap.poll();
                cover++;
                delta[r + 1]--;
                selected++;
            }
        }
        return queries.length - selected;
    }
}
