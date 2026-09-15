import java.util.PriorityQueue;

class Solution {

    public int findKthLargest(int[] nums, int k) {
        // A min-heap of size k holds the k largest values seen so far;
        // its root is the smallest of them — the current kth largest.
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        for (int i = 0; i < k; i++) {
            heap.offer(nums[i]);
        }
        for (int i = k; i < nums.length; i++) {
            // Peek first: only values strictly greater than the root
            // earn a pop-and-push, keeping the pass O(n log k).
            if (nums[i] > heap.peek()) {
                heap.poll();
                heap.offer(nums[i]);
            }
        }
        // When the scan ends the root is the smallest of the top k —
        // the kth largest by rank, duplicates counted.
        return heap.peek();
    }
}
