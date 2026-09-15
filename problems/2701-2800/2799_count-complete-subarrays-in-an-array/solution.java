import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    public int countCompleteSubarrays(int[] nums) {
        Set<Integer> values = new HashSet<>();
        for (int value : nums) {
            values.add(value);
        }
        // A subarray is complete exactly when it holds every distinct value
        // of the whole array: atMost(k) counts it, atMost(k - 1) does not.
        return atMost(nums, values.size()) - atMost(nums, values.size() - 1);
    }

    // Number of subarrays holding at most `limit` distinct values, counted by
    // right endpoint with a forward-only left boundary.
    private int atMost(int[] nums, int limit) {
        Map<Integer, Integer> freq = new HashMap<>();
        int distinct = 0;
        int left = 0;
        int count = 0;
        for (int right = 0; right < nums.length; ++right) {
            freq.merge(nums[right], 1, Integer::sum);
            if (freq.get(nums[right]) == 1) distinct++;
            while (distinct > limit) {
                if (freq.merge(nums[left], -1, Integer::sum) == 0) distinct--;
                left++;
            }
            // every start in [left, right] keeps the window within limit
            // (limit 0 shrinks every window empty, contributing nothing)
            count += right - left + 1;
        }
        return count;
    }
}
