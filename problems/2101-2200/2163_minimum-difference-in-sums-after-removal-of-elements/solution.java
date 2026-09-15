import java.util.Collections;
import java.util.PriorityQueue;

class Solution {

    public long minimumDifference(int[] nums) {
        int total = nums.length;
        int n = total / 3;

        // left_min[i] = sum of the n smallest values among nums[0..i] (valid when i >= n-1)
        long[] leftMin = new long[total];
        PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder()); // keeps the n smallest so far
        long running = 0;
        for (int i = 0; i < total; i++) {
            int value = nums[i];
            heap.add(value);
            running += value;
            if (heap.size() > n) {
                running -= heap.poll(); // drop the largest kept
            }
            if (heap.size() == n) {
                leftMin[i] = running;
            }
        }

        // right_max[i] = sum of the n largest values among nums[i..] (valid when total - i >= n)
        long[] rightMax = new long[total];
        PriorityQueue<Integer> heap2 = new PriorityQueue<>(); // keeps the n largest so far
        long running2 = 0;
        for (int i = total - 1; i >= 0; i--) {
            int value = nums[i];
            heap2.add(value);
            running2 += value;
            if (heap2.size() > n) {
                running2 -= heap2.poll(); // drop the smallest kept
            }
            if (heap2.size() == n) {
                rightMax[i] = running2;
            }
        }

        Long answer = null;
        for (int i = n - 1; i <= 2 * n - 1; i++) {
            long left = leftMin[i];
            long right = rightMax[i + 1];
            long candidate = left - right;
            if (answer == null || candidate < answer) {
                answer = candidate;
            }
        }
        return answer;
    }
}
