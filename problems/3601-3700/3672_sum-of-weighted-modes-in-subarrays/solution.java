import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

class Solution {

    public long modeWeight(int[] nums, int k) {
        // cnt holds each value's frequency inside the window; bucket[f]
        // counts how many distinct values sit at frequency f, so the top
        // frequency tracks entries and exits in O(1). Heap entries are
        // (-frequency, value) pairs, so the heap top is the smallest value
        // of the top frequency; stale entries (their recorded frequency has
        // since moved) are skimmed off when they reach the top — every
        // revisit of a state pushes a fresh copy, so discarding them early
        // is safe. Weights reach 10^10 and the total 2.5 * 10^14, so the
        // sum widens to long.
        Map<Integer, Integer> cnt = new HashMap<>();
        Map<Integer, Integer> bucket = new HashMap<>();
        PriorityQueue<int[]> heap = new PriorityQueue<>((left, right) ->
            left[0] != right[0] ? Integer.compare(left[0], right[0]) : Integer.compare(left[1], right[1])
        );
        int topFreq = 0;
        long total = 0;
        for (int right = 0; right < nums.length; right++) {
            // Enter: lift the arriving value one frequency up.
            int entering = cnt.merge(nums[right], 1, Integer::sum);
            bucket.merge(entering, 1, Integer::sum);
            if (entering > 1) {
                bucket.merge(entering - 1, -1, Integer::sum);
            }
            topFreq = Math.max(topFreq, entering);
            heap.offer(new int[] { -entering, nums[right] });
            if (right >= k) {
                // Leave: drop the exiting value one frequency down; only a
                // one-step fall of the top frequency is ever possible.
                int exiting = cnt.merge(nums[right - k], -1, Integer::sum);
                bucket.merge(exiting + 1, -1, Integer::sum);
                if (exiting > 0) {
                    bucket.merge(exiting, 1, Integer::sum);
                    heap.offer(new int[] { -exiting, nums[right - k] });
                }
                if (bucket.getOrDefault(topFreq, 0) == 0) {
                    topFreq--;
                }
            }
            if (right >= k - 1) {
                // Skim stale tops, then score mode * top frequency.
                while (cnt.get(heap.peek()[1]) != -heap.peek()[0]) {
                    heap.poll();
                }
                total += (long) heap.peek()[1] * topFreq;
            }
        }
        return total;
    }
}
