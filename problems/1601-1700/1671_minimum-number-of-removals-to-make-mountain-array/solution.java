import java.util.Arrays;

class Solution {

    public int minimumMountainRemovals(int[] nums) {
        int n = nums.length;
        // lis[i]: longest strictly increasing subsequence ending at i
        // (strict comparisons — plateaus can ride neither slope).
        int[] lis = new int[n];
        // lds[i]: symmetric strictly decreasing chain starting at i, built
        // by scanning right to left.
        int[] lds = new int[n];
        Arrays.fill(lis, 1);
        Arrays.fill(lds, 1);
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i] && lis[j] + 1 > lis[i]) {
                    lis[i] = lis[j] + 1;
                }
            }
        }
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i + 1; j < n; j++) {
                if (nums[j] < nums[i] && lds[j] + 1 > lds[i]) {
                    lds[i] = lds[j] + 1;
                }
            }
        }
        // Minimizing removals = maximizing mountain length. A valid peak
        // needs at least one element on each side, and the peak is counted
        // by both tables, hence the -1.
        int best = 0;
        for (int i = 0; i < n; i++) {
            if (lis[i] >= 2 && lds[i] >= 2) {
                best = Math.max(best, lis[i] + lds[i] - 1);
            }
        }
        return n - best;
    }
}
