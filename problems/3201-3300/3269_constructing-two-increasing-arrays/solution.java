import java.util.Arrays;

class Solution {

    public int minLargest(int[] nums1, int[] nums2) {
        // Read in increasing order, any replacement becomes a merge of the
        // two arrays; replaying a merge hands each slot the smallest value
        // above its predecessor with the slot's parity, so a step adds 1
        // when the bit differs from the previous bit and 2 when it repeats.
        // dp[i][j][f] is the replay minimum after consuming i slots of
        // nums1 and j of nums2 with the last value taken by array f; two
        // rolling rows carry the table. Answers are <= 2*(n+m) <= 4000, so
        // BIG = 1<<29 sentinel arithmetic stays far from overflow.
        final int BIG = 1 << 29;
        int n = nums1.length,
            m = nums2.length;
        int[] prv0 = new int[m + 1];
        int[] prv1 = new int[m + 1];
        Arrays.fill(prv0, BIG);
        Arrays.fill(prv1, BIG);
        if (m >= 1) {
            prv1[1] = 2 - nums2[0];
            for (int j = 2; j <= m; j++) {
                prv1[j] = prv1[j - 1] + (nums2[j - 2] != nums2[j - 1] ? 1 : 2);
            }
        }
        for (int i = 1; i <= n; i++) {
            int x = nums1[i - 1];
            int stepX = i >= 2 && nums1[i - 2] != x ? 1 : 2;
            int[] cur0 = new int[m + 1];
            int[] cur1 = new int[m + 1];
            Arrays.fill(cur0, BIG);
            Arrays.fill(cur1, BIG);
            cur0[0] = i == 1 ? 2 - x : prv0[0] + stepX;
            for (int j = 1; j <= m; j++) {
                int y = nums2[j - 1];
                cur0[j] = Math.min(prv0[j] + stepX, prv1[j] + (y != x ? 1 : 2));
                int best = cur0[j - 1] + (x != y ? 1 : 2);
                if (j >= 2) {
                    best = Math.min(best, cur1[j - 1] + (nums2[j - 2] != y ? 1 : 2));
                }
                cur1[j] = best;
            }
            prv0 = cur0;
            prv1 = cur1;
        }
        return Math.min(prv0[m], prv1[m]);
    }
}
