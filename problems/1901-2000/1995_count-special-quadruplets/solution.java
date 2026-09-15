import java.util.HashMap;
import java.util.Map;

class Solution {

    public int countQuadruplets(int[] nums) {
        // The condition rewrites to nums[a] + nums[b] == nums[d] - nums[c].
        // Sweep c left to right, and for each d > c count how many earlier
        // pairs (a, b) with b < c already sum to nums[d] - nums[c]; a map of
        // pair sums is extended by one entry per c step. Every valid
        // quadruplet is counted exactly once at its c, d pair. The maximum
        // answer is C(50, 4) = 230300, well inside int.
        int n = nums.length;
        int ans = 0;
        Map<Integer, Integer> twoSum = new HashMap<>();
        for (int c = 0; c < n; c++) {
            for (int a = 0; a < c - 1; a++) {
                int s = nums[a] + nums[c - 1];
                twoSum.merge(s, 1, Integer::sum);
            }
            for (int d = c + 1; d < n; d++) {
                ans += twoSum.getOrDefault(nums[d] - nums[c], 0);
            }
        }
        return ans;
    }
}
