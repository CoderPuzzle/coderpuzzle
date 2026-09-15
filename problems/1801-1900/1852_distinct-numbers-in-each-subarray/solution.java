import java.util.*;

class Solution {

    // One frequency map slides with the window; the running count of values
    // whose frequency is nonzero is the answer per window.
    public int[] distinctNumbers(int[] nums, int k) {
        int n = nums.length;
        int[] ans = new int[n - k + 1];
        Map<Integer, Integer> freq = new HashMap<>();
        int distinct = 0;
        for (int i = 0; i < n; i++) {
            freq.merge(nums[i], 1, Integer::sum);
            if (freq.get(nums[i]) == 1) {
                distinct++;
            }
            if (i >= k) {
                int left = nums[i - k];
                int f = freq.merge(left, -1, Integer::sum);
                if (f == 0) {
                    distinct--;
                }
            }
            if (i >= k - 1) {
                ans[i - k + 1] = distinct;
            }
        }
        return ans;
    }
}
