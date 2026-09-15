class Solution {

    public long countQuadruplets(int[] nums) {
        // For every pair j < k with nums[k] < nums[j], a quadruplet is any
        // i < j with nums[i] < nums[k] plus any l > k with nums[l] > nums[j].
        // Each j rebuilds the less-than row from its predecessor and sweeps
        // its window right-to-left carrying the suffix-greater count.
        // Answers reach C(4000,4) ~ 1.07e13, hence the long accumulators.
        int n = nums.length;
        long ans = 0;
        int[] less = new int[n + 2];
        for (int j = 1; j <= n - 3; j++) {
            for (int x = nums[j - 1] + 1; x <= n; x++) {
                less[x]++;
            }
            int vj = nums[j];
            long tot = 0;
            long c = 0;
            for (int k = n - 1; k > j; k--) {
                int uk = nums[k];
                if (uk < vj) {
                    tot += (long) less[uk] * c;
                } else if (uk > vj) {
                    c++;
                }
            }
            ans += tot;
        }
        return ans;
    }
}
