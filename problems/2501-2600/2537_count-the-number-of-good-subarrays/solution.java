import java.util.HashMap;
import java.util.Map;

class Solution {

    public long countGood(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        long pairs = 0;
        long ans = 0;
        int left = 0;
        int n = nums.length;
        for (int right = 0; right < n; right++) {
            int x = nums[right];
            // Appending a value already seen c times inside the window forms
            // exactly c new equal pairs; the map plus this running total keep
            // the pair count exact under any window move (hash map because
            // values reach 1e9).
            int c = count.getOrDefault(x, 0);
            pairs += c;
            count.put(x, c + 1);
            // Window [left, right] has >= k pairs, so it and every extension
            // of it to the right are good: exactly n - right subarrays share
            // this right endpoint and start at left or later.
            while (pairs >= k) {
                ans += n - right;
                int y = nums[left];
                // The departing value leaves cy - 1 copies behind, exactly
                // how many pairs its removal destroys.
                int cy = count.get(y);
                count.put(y, cy - 1);
                pairs -= cy - 1;
                left++;
            }
        }
        return ans;
    }
}
