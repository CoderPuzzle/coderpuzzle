import java.util.Arrays;

class Solution {

    public long[] minOperations(int[] nums, int[] queries) {
        int[] sorted = nums.clone();
        Arrays.sort(sorted);
        int n = sorted.length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + sorted[i];
        }
        long[] out = new long[queries.length];
        for (int t = 0; t < queries.length; t++) {
            // Each query is the sum of |nums[i] - q|; sorted prefix sums make
            // it one binary search plus O(1) arithmetic.
            int q = queries[t];
            int lo = 0,
                hi = n;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (sorted[mid] < q) lo = mid + 1;
                else hi = mid;
            }
            // j counts elements strictly below q (ties land right but
            // contribute zero either way): smaller ones are raised to q, the
            // rest are lowered.
            int j = lo;
            long left = (long) q * j - prefix[j];
            long right = prefix[n] - prefix[j] - (long) q * (n - j);
            out[t] = left + right;
        }
        return out;
    }
}
