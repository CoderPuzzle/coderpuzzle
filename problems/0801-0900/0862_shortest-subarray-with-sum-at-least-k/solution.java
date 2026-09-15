import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int shortestSubarray(int[] nums, int k) {
        int n = nums.length;
        // Negatives break the sliding-window trick, so reason in
        // prefix sums: a subarray sum is prefix[i] - prefix[j], and
        // the sentinel prefix[0] = 0 lets subarrays starting at 0
        // compete.
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        // Deque of start indices whose prefix sums strictly increase
        // front to back.
        Deque<Integer> dq = new ArrayDeque<>();
        int best = n + 1;
        for (int i = 0; i <= n; i++) {
            long p = prefix[i];
            // Consume qualifying fronts: each offers length i - front,
            // and popping is safe because later ends only lengthen the
            // same start.
            while (!dq.isEmpty() && prefix[dq.peekFirst()] <= p - k) {
                best = Math.min(best, i - dq.pollFirst());
            }
            // A later index with an equal-or-smaller prefix dominates
            // as a future start, so trim the tail.
            while (!dq.isEmpty() && prefix[dq.peekLast()] >= p) {
                dq.pollLast();
            }
            dq.addLast(i);
        }
        return best <= n ? best : -1;
    }
}
