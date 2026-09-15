import java.util.HashMap;
import java.util.Map;

class Solution {

    // Slides a fixed-length-k window holding a value->count map, so the map
    // size is always the current window's distinct count. Window sums reach
    // n * max(nums[i]) = 2 * 10^4 * 10^9 = 2 * 10^13, past int range, so
    // they accumulate in a long; no intermediate exceeds that, far below the
    // ~9.2 * 10^18 long ceiling.
    public long maxSum(int[] nums, int m, int k) {
        long best = 0;
        Map<Integer, Integer> freq = new HashMap<>();
        long winSum = 0;
        for (int right = 0; right < nums.length; right++) {
            freq.merge(nums[right], 1, Integer::sum);
            winSum += nums[right];
            if (right >= k) {
                final int old = nums[right - k];
                if (freq.merge(old, -1, Integer::sum) == 0) {
                    freq.remove(old);
                }
                winSum -= old;
            }
            if (right + 1 >= k && freq.size() >= m && winSum > best) {
                best = winSum;
            }
        }
        return best;
    }
}
