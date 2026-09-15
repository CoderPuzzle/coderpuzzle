class Solution {

    // Values are bounded to [-50, 50], so only the 50 negative values can
    // ever be an answer: cnt[v + 50] counts copies of the negative value v
    // inside the current window. Each answer is found by walking those
    // buckets smallest value first until x negatives accumulate (0 when
    // fewer than x).
    public int[] getSubarrayBeauty(int[] nums, int k, int x) {
        int[] cnt = new int[50];
        int[] res = new int[nums.length - k + 1];
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] < 0) {
                cnt[nums[i] + 50]++;
            }
            int j = i - k;
            if (j >= 0 && nums[j] < 0) {
                cnt[nums[j] + 50]--;
            }
            if (i >= k - 1) {
                // Walk the buckets smallest value first until x negatives
                // have been seen; fewer than x in total means beauty 0.
                int rem = x;
                int beauty = 0;
                for (int d = 0; d < 50 && rem > 0; d++) {
                    rem -= cnt[d];
                    if (rem <= 0) beauty = d - 50;
                }
                res[i - k + 1] = beauty;
            }
        }
        return res;
    }
}
