import java.util.PriorityQueue;

class Solution {

    public int[] findMaxSum(int[] nums1, int[] nums2, int k) {
        int n = nums1.length;
        Integer[] indices = new Integer[n];
        for (int i = 0; i < n; i++) indices[i] = i;
        // sweep indices by increasing nums1: each query pools the strictly smaller values
        java.util.Arrays.sort(indices, (a, b) -> Integer.compare(nums1[a], nums1[b]));
        PriorityQueue<Integer> heap = new PriorityQueue<>(); // min-heap of top-k nums2 values
        long total = 0;
        int[] result = new int[n];
        int i = 0;
        while (i < n) {
            int j = i;
            while (j < n && nums1[indices[j]] == nums1[indices[i]]) j++;
            // strict <: the equal-value block is answered before its own values join
            for (int t = i; t < j; t++) result[indices[t]] = (int) total;
            // pool invariant: the heap holds the top-k nums2 so far, total their sum
            for (int t = i; t < j; t++) {
                // evict the current minimum only when the newcomer beats it
                int val = nums2[indices[t]];
                if (heap.size() < k) {
                    heap.offer(val);
                    total += val;
                } else if (val > heap.peek()) {
                    total += val - heap.poll();
                    heap.offer(val);
                }
            }
            i = j;
        }
        return result;
    }
}
