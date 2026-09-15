import java.util.HashMap;
import java.util.Map;

class Solution {

    public long maximumSubarraySum(int[] nums, int k) {
        // counts maps value -> frequency in the current window; zero-count
        // keys are removed so counts.size() is the window's distinct count.
        Map<Integer, Integer> counts = new HashMap<>();
        long windowSum = 0;
        long best = 0;
        for (int i = 0; i < nums.length; i++) {
            int value = nums[i];
            counts.merge(value, 1, Integer::sum);
            windowSum += value;
            // Retire nums[i-k] BEFORE evaluating, so exactly k members
            // are in the window at each check.
            if (i >= k) {
                int old = nums[i - k];
                int c = counts.get(old) - 1;
                if (c == 0) {
                    counts.remove(old);
                } else {
                    counts.put(old, c);
                }
                windowSum -= old;
            }
            // k slots holding k distinct values means no repeats.
            if (i >= k - 1 && counts.size() == k && windowSum > best) {
                best = windowSum;
            }
        }
        return best;
    }
}
