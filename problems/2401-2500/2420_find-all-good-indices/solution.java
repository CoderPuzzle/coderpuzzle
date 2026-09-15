import java.util.Arrays;

class Solution {

    public int[] goodIndices(int[] nums, int k) {
        // Run-length DP: noninc[i] is the longest non-increasing run ending
        // at i; nondec[i] the longest non-decreasing run starting at i.
        // Index i is good exactly when both runs flanking it reach length
        // k: noninc[i-1] >= k covers nums[i-k..i-1], nondec[i+1] >= k
        // covers nums[i+1..i+k]. Two linear sweeps plus one pass over the
        // candidate range replace an O(n*k) window scan.
        int n = nums.length;
        int[] noninc = new int[n],
            nondec = new int[n];
        Arrays.fill(noninc, 1);
        Arrays.fill(nondec, 1);
        for (int i = 1; i < n; ++i) {
            if (nums[i] <= nums[i - 1]) {
                noninc[i] = noninc[i - 1] + 1;
            }
        }
        for (int i = n - 2; i >= 0; --i) {
            if (nums[i] <= nums[i + 1]) {
                nondec[i] = nondec[i + 1] + 1;
            }
        }
        int[] good = new int[Math.max(0, n - 2 * k)];
        int count = 0;
        for (int i = k; i < n - k; ++i) {
            if (noninc[i - 1] >= k && nondec[i + 1] >= k) {
                good[count++] = i;
            }
        }
        return Arrays.copyOf(good, count);
    }
}
