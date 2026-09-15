import java.util.HashMap;
import java.util.Map;

class Solution {

    public int minLength(int[] nums, int k) {
        // One pass, right end expanding: freq counts each value inside the
        // window and distinctSum tracks the sum of the distinct values
        // present — a value joins the sum when its first copy enters and
        // leaves it when its last copy departs.
        Map<Integer, Integer> freq = new HashMap<>();
        long distinctSum = 0;
        int best = -1;
        int left = 0;
        for (int right = 0; right < nums.length; right++) {
            freq.merge(nums[right], 1, Integer::sum);
            if (freq.get(nums[right]) == 1) {
                distinctSum += nums[right];
            }
            // Shrink from the left while the window stays qualified; every
            // prefix of a kept window is dropped only after recording it.
            while (distinctSum >= k && left <= right) {
                int length = right - left + 1;
                if (best == -1 || length < best) {
                    best = length;
                }
                int out = nums[left];
                if (freq.get(out) == 1) {
                    distinctSum -= out;
                }
                freq.merge(out, -1, Integer::sum);
                left++;
            }
        }
        return best;
    }
}
