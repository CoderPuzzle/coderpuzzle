import java.util.PriorityQueue;

class Solution {

    public long maximumScore(int[] nums, String s) {
        // Sweep left to right pushing every value as a candidate final
        // slot; the '1' met at index i claims the best slot offered so
        // far. The score peaks at 10^5 * 10^9 = 10^14, so it accumulates
        // in a long.
        PriorityQueue<Integer> heap = new PriorityQueue<>(java.util.Collections.reverseOrder());
        long answer = 0;
        for (int i = 0; i < nums.length; i++) {
            heap.offer(nums[i]);
            if (s.charAt(i) == '1') {
                answer += heap.poll();
            }
        }
        return answer;
    }
}
