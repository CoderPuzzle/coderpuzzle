import java.util.Arrays;

class Solution {

    public long minimalKSum(int[] nums, int k) {
        // Take the k smallest missing positives: sort distinct values,
        // consume each gap with an arithmetic-series sum, then spill into
        // the tail. Sums reach ~k^2/2 with k up to 10^8, so long carries.
        int[] ordered = nums.clone();
        Arrays.sort(ordered);
        long total = 0;
        long taken = 0;
        long previous = 0;
        for (int i = 0; i < ordered.length && taken < k; ++i) {
            if (i > 0 && ordered[i] == ordered[i - 1]) {
                continue;
            }
            long gap = (long) ordered[i] - previous - 1;
            if (gap > 0) {
                long use = Math.min(gap, (long) k - taken);
                total += use * (previous + 1) + (use * (use - 1)) / 2;
                taken += use;
            }
            previous = ordered[i];
        }
        if (taken < k) {
            long use = (long) k - taken;
            total += use * (previous + 1) + (use * (use - 1)) / 2;
        }
        return total;
    }
}
