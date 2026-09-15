class Solution {

    public int sumCounts(int[] nums) {
        int n = nums.length;
        long ans = 0;
        // For each left end, grow the right end one element at a time; the
        // running distinct count only ever grows, so it is the distinct
        // count of every prefix subarray nums[i..j].
        for (int i = 0; i < n; ++i) {
            boolean[] seen = new boolean[101];
            int distinct = 0;
            for (int j = i; j < n; ++j) {
                if (!seen[nums[j]]) {
                    seen[nums[j]] = true;
                    ++distinct;
                }
                ans += (long) distinct * distinct;
            }
        }
        return (int) ans;
    }
}
