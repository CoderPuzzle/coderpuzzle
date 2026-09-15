import java.util.Arrays;

class Solution {

    public long perfectPairs(int[] nums) {
        // Signs never matter: with x = |a| <= y = |b| a pair is perfect
        // exactly when y <= 2x, so work in sorted absolute values and
        // count, for each i, the later entries within double of a[i].
        long[] a = new long[nums.length];
        for (int i = 0; i < nums.length; i++) {
            a[i] = Math.abs((long) nums[i]);
        }
        Arrays.sort(a);
        // The doubled bound 2 * a[i] never shrinks as i moves right, so
        // the frontier j only ever advances; positions strictly between
        // i and j pair with i. Counts reach ~5e9, hence long.
        long ans = 0;
        int j = 0;
        for (int i = 0; i < a.length; i++) {
            while (j < a.length && a[j] <= 2 * a[i]) {
                j++;
            }
            ans += j - i - 1;
        }
        return ans;
    }
}
