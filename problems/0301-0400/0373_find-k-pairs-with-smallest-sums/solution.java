import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public int[][] kSmallestPairs(int[] nums1, int[] nums2, int k) {
        if (nums1.length == 0 || nums2.length == 0 || k <= 0) return new int[0][];
        // min-heap ordered by (sum, i, j)
        PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> {
            if (a[0] != b[0]) return Long.compare(a[0], b[0]);
            if (a[1] != b[1]) return Long.compare(a[1], b[1]);
            return Long.compare(a[2], b[2]);
        });
        // Seed each active row's minimum (nums1[i], nums2[0]); rows past
        // min(len(nums1), k) can never reach the k smallest.
        int limit = Math.min(nums1.length, k);
        for (int i = 0; i < limit; i++) {
            pq.offer(new long[] { (long) nums1[i] + nums2[0], i, 0 });
        }
        List<int[]> result = new ArrayList<>();
        while (!pq.isEmpty() && result.size() < k) {
            long[] top = pq.poll();
            int i = (int) top[1],
                j = (int) top[2];
            // The popped pair's only unexplored successor in its row is
            // (i, j+1); pushing it keeps the heap holding the minimum of
            // every active row, so each pop yields the global minimum left.
            result.add(new int[] { nums1[i], nums2[j] });
            if (j + 1 < nums2.length) {
                pq.offer(new long[] { (long) nums1[i] + nums2[j + 1], i, j + 1 });
            }
        }
        return result.toArray(new int[0][]);
    }
}
