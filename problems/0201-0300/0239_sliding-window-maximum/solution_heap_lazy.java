import java.util.*;

class Solution {

    public int[] maxSlidingWindow(int[] nums, int k) {
        // Max-heap of (value, index) records, ordered by value.
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(b[0], a[0]));
        int[] result = new int[Math.max(0, nums.length - k + 1)];
        int ri = 0;
        for (int i = 0; i < nums.length; i++) {
            heap.offer(new int[] { nums[i], i });
            // Lazy deletion: drop records whose index has slid out of the window.
            while (heap.peek()[1] <= i - k) heap.poll();
            // The top is now the largest value still inside the window.
            if (i >= k - 1) result[ri++] = heap.peek()[0];
        }
        return result;
    }
}
