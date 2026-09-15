class Solution {

    public int maxSumMinProduct(int[] nums) {
        final long MOD = 1_000_000_007L;
        int n = nums.length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        long best = 0;
        int[] stack = new int[n + 1]; // indices with strictly increasing values
        int top = 0;
        for (int i = 0; i <= n; i++) {
            long cur = i < n ? nums[i] : 0; // sentinel 0 pops everything
            while (top > 0 && nums[stack[top - 1]] >= cur) {
                long m = nums[stack[--top]];
                int left = top > 0 ? stack[top - 1] : -1;
                long total = prefix[i] - prefix[left + 1];
                best = Math.max(best, m * total);
            }
            if (i < n) {
                stack[top++] = i;
            }
        }
        return (int) (best % MOD);
    }
}
