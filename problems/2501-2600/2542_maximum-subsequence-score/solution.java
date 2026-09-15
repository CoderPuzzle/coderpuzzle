import java.util.Arrays;
import java.util.PriorityQueue;

class Solution {

    public long maxScore(int[] nums1, int[] nums2, int k) {
        int n = nums1.length;
        Integer[] idx = new Integer[n];
        for (int i = 0; i < n; i++) idx[i] = i;
        // Enumerate which element provides the min(nums2): sweeping indices
        // in descending nums2 order means everything already seen has
        // nums2 >= b, so b is the minimum of any set drawn from seen pairs.
        Arrays.sort(idx, (a, b) -> Integer.compare(nums2[b], nums2[a]));
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        long total = 0;
        long best = 0;
        for (int i = 0; i < n; i++) {
            int j = idx[i];
            heap.offer(nums1[j]);
            total += nums1[j];
            // Min-heap of size k with a running sum holds the k largest nums1
            // seen so far; ejecting the smallest keeps the top-k sum correct.
            if (heap.size() > k) {
                total -= heap.poll();
            }
            // With k companions available, total * nums2[j] is the best score
            // under the assumption that nums2[j] is the minimum; take the max
            // over the sweep. Ties in nums2 are safe: the last of them still
            // sees all the others in the heap.
            if (heap.size() == k) {
                best = Math.max(best, total * nums2[j]);
            }
        }
        return best;
    }
}
