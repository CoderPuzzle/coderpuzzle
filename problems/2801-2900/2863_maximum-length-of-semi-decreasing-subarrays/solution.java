import java.util.*;

class Solution {

    public int maxSubarrayLength(int[] nums) {
        // A subarray nums[j..i] qualifies exactly when j < i and
        // nums[j] > nums[i]; only the two endpoints matter.
        int n = nums.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        // compare, not subtraction: endpoint values may differ by 2 * 10^9.
        Arrays.sort(order, (a, b) -> Integer.compare(nums[b], nums[a]));
        int best = 0;
        // Sentinel n can never beat any real position x <= n - 1.
        int minIndex = n;
        int g = 0;
        while (g < n) {
            int h = g;
            while (h < n && nums[order[h]] == nums[order[g]]) {
                h++;
            }
            // Query first: positions of strictly larger values only, so
            // equal-valued endpoints can never pair with each other.
            for (int k = g; k < h; k++) {
                int x = order[k];
                if (minIndex < x && x - minIndex + 1 > best) {
                    best = x - minIndex + 1;
                }
            }
            // Then merge this equal-value group into the running minimum.
            for (int k = g; k < h; k++) {
                if (order[k] < minIndex) {
                    minIndex = order[k];
                }
            }
            g = h;
        }
        return best;
    }
}
