import java.util.*;

class Solution {

    public long countRatioSubarrays(int[] nums, int a, int b) {
        int n = nums.length;
        // Transformed prefix sums reach 10^5 * 10^9 = 10^14 in magnitude,
        // and the answer reaches ~5 * 10^9, so both coordinates and the
        // Fenwick cells are 64-bit.
        long[] pref = new long[n + 1];
        for (int i = 0; i < n; i++) {
            pref[i + 1] = pref[i] + (nums[i] % 2 == 0 ? b : -((long) a));
        }
        // Coordinate-compress the prefix values; duplicates share one slot
        // so that >= comparisons count them all.
        long[] sorted = pref.clone();
        Arrays.sort(sorted);
        int size = 0;
        for (int i = 0; i < sorted.length; i++) {
            if (i == 0 || sorted[i] != sorted[size - 1]) sorted[size++] = sorted[i];
        }
        long[] tree = new long[size + 1];
        long answer = 0;
        update(tree, size, rank(sorted, size, pref[0]));
        long seen = 1;
        for (int m = 1; m <= n; m++) {
            int r = rank(sorted, size, pref[m]);
            // Subarray [m-1, k] for every earlier l = k with
            // pref[m] <= pref[l]: everything seen minus what is strictly below.
            answer += seen - query(tree, r - 1);
            update(tree, size, r);
            seen++;
        }
        return answer;
    }

    private int rank(long[] sorted, int size, long value) {
        int lo = 0,
            hi = size - 1;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (sorted[mid] < value) lo = mid + 1;
            else hi = mid;
        }
        return lo + 1;
    }

    private void update(long[] tree, int size, int i) {
        for (; i <= size; i += i & -i) tree[i]++;
    }

    private long query(long[] tree, int i) {
        long total = 0;
        for (; i > 0; i -= i & -i) total += tree[i];
        return total;
    }
}
