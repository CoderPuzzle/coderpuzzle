class Solution {

    public int maximumLength(int[] nums, int k) {
        // A valid subsequence's adjacent sums share one unknown residue,
        // so try each candidate val in [0, k). While streaming nums under
        // a fixed val, dp[r] is the best chain whose last element is r
        // mod k; appending an element of residue r needs a previous
        // element at residue (val - r) % k, and a lone element always
        // restarts a chain. The double % keeps the remainder non-negative;
        // n and k stay at 10^3, well inside int everywhere.
        int[] residues = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            residues[i] = nums[i] % k;
        }
        int best = 0;
        for (int val = 0; val < k; val++) {
            int[] dp = new int[k];
            for (int r : residues) {
                int prev = dp[(((val - r) % k) + k) % k];
                int length = prev >= 1 ? prev + 1 : 1;
                if (length > dp[r]) {
                    dp[r] = length;
                    if (length > best) {
                        best = length;
                    }
                }
            }
        }
        return best;
    }
}
