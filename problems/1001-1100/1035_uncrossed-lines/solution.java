class Solution {

    public int maxUncrossedLines(int[] nums1, int[] nums2) {
        int n = nums2.length;
        int[] prev = new int[n + 1];
        for (int a : nums1) {
            int[] cur = new int[n + 1];
            for (int j = 1; j <= n; j++) {
                if (a == nums2[j - 1]) {
                    cur[j] = prev[j - 1] + 1;
                } else {
                    cur[j] = Math.max(cur[j - 1], prev[j]);
                }
            }
            prev = cur;
        }
        return prev[n];
    }
}
