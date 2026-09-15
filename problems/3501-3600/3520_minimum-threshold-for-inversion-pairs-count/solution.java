import java.util.Arrays;

class Solution {

    // count(x) = #{(i, j) : i < j, nums[i] > nums[j], nums[i] - nums[j] <=
    // x} is non-decreasing in x, so binary search the smallest x with
    // count(x) >= k. Each count sweeps left to right with a Fenwick tree
    // over the compressed values, adding for every j the number of earlier
    // elements whose value falls in the window (nums[j], nums[j] + x].
    // n <= 1e4 bounds the pair count by n*(n-1)/2 < 5e7, well inside int.
    public int minThreshold(int[] nums, int k) {
        int[] vals = nums.clone();
        Arrays.sort(vals);
        int m = 0;
        for (int i = 0; i < vals.length; i++) {
            if (i == 0 || vals[i] != vals[i - 1]) {
                vals[m++] = vals[i];
            }
        }
        int maxDiff = vals[m - 1] - vals[0];
        if (maxDiff == 0 || count(nums, vals, m, maxDiff) < k) {
            return -1;
        }
        int lo = 1,
            hi = maxDiff;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (count(nums, vals, m, mid) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    private int count(int[] nums, int[] vals, int m, long x) {
        int[] tree = new int[m + 1];
        int total = 0;
        for (int v : nums) {
            int c = lowerBound(vals, m, v);
            // Earlier elements with value in (v, v + x]; v + x may overflow
            // int, so the upper-bound key is a long.
            int hi = upperBound(vals, m, (long) v + x);
            for (int i = hi; i > 0; i -= i & -i) {
                total += tree[i];
            }
            // c is the 0-based compressed index; its Fenwick position is
            // c + 1, so the prefix cut and the insert both start there.
            for (int i = c + 1; i > 0; i -= i & -i) {
                total -= tree[i];
            }
            for (int i = c + 1; i <= m; i += i & -i) {
                tree[i]++;
            }
        }
        return total;
    }

    private int lowerBound(int[] vals, int m, int v) {
        int lo = 0,
            hi = m;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (vals[mid] < v) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }

    private int upperBound(int[] vals, int m, long key) {
        int lo = 0,
            hi = m;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (vals[mid] <= key) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
