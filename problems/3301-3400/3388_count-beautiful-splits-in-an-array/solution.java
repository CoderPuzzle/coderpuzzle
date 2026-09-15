class Solution {

    public int beautifulSplits(int[] nums) {
        int n = nums.length;
        if (n < 3) {
            return 0;
        }
        int w = n + 1;
        // lcp[i][j] = longest common prefix of nums[i:] and nums[j:]
        short[][] lcp = new short[n + 1][w];
        for (int i = n - 1; i >= 0; i--) {
            short[] row = lcp[i];
            short[] nextRow = lcp[i + 1];
            int ni = nums[i];
            for (int j = n - 1; j > i; j--) {
                if (ni == nums[j]) {
                    row[j] = (short) (nextRow[j + 1] + 1);
                }
            }
        }

        int count = 0;
        for (int i = 1; i < n - 1; i++) {
            // i = end of nums1, start of nums2
            int jEnd;
            // Case A: nums1 is a prefix of nums2 => j >= 2*i and nums[0:i] == nums[i:2i]
            if (lcp[0][i] >= i && 2 * i <= n - 1) {
                count += n - 2 * i;
                jEnd = 2 * i;
            } else {
                jEnd = n;
            }
            // Case B: nums2 is a prefix of nums3, counting only j not already covered by A
            short[] row = lcp[i];
            for (int j = i + 1; j < jEnd; j++) {
                int len = j - i;
                if (row[j] >= len && n - j >= len) {
                    count++;
                }
            }
        }
        return count;
    }
}
