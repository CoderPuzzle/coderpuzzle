import java.util.Arrays;
import java.util.PriorityQueue;

class Solution {

    public long kSum(int[] nums, int k) {
        // every subsequence sum = base - (subset sum of absolute values)
        long base = 0;
        for (int x : nums) {
            if (x > 0) {
                base += x;
            }
        }
        long[] costs = new long[nums.length];
        for (int i = 0; i < nums.length; i++) {
            costs[i] = Math.abs((long) nums[i]);
        }
        Arrays.sort(costs);
        if (k == 1) {
            return base;
        }
        int n = costs.length;
        // min-heap of (sum, idx); ties on sum broken by smaller idx
        PriorityQueue<long[]> heap = new PriorityQueue<>((a, b) ->
            a[0] != b[0] ? Long.compare(a[0], b[0]) : Long.compare(a[1], b[1])
        );
        heap.add(new long[] { costs[0], 0 });
        long count = 1; // empty subset (sum 0) is the 1st smallest
        while (count < k) {
            long[] top = heap.poll();
            long cur = top[0];
            int idx = (int) top[1];
            count++;
            if (count == k) {
                return base - cur;
            }
            if (idx + 1 < n) {
                heap.add(new long[] { cur - costs[idx] + costs[idx + 1], idx + 1 });
                heap.add(new long[] { cur + costs[idx + 1], idx + 1 });
            }
        }
        return base;
    }
}
