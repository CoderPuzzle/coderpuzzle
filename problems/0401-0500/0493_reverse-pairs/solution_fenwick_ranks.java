import java.util.Arrays;

class Solution {

    public int reversePairs(int[] nums) {
        // Widen to long: values reach both int32 extremes and 2 * value
        // would overflow.
        long[] widened = new long[nums.length];
        for (int i = 0; i < nums.length; i++) {
            widened[i] = nums[i];
        }
        // Fenwick over compressed ranks instead of merge-sort counting:
        // walk right-to-left, so by the time the walk reaches an entry the
        // tree holds exactly the entries to that entry's right. Values span
        // the full int32 range, so the ranks come from the sorted distinct
        // values, and their doubled selves ride beside them — x qualifies
        // against v exactly when 2 * v < x.
        Arrays.sort(widened);
        int m = 0;
        for (int i = 0; i < widened.length; i++) {
            if (i == 0 || widened[i] != widened[i - 1]) {
                widened[m++] = widened[i];
            }
        }
        long[] vals = Arrays.copyOf(widened, m);
        long[] doubled = new long[m];
        for (int i = 0; i < m; i++) {
            doubled[i] = 2L * vals[i];
        }
        int[] bit = new int[m + 1];
        // The tally is kept 64-bit alongside the widened comparisons.
        long count = 0;
        for (int k = nums.length - 1; k >= 0; k--) {
            long x = nums[k];
            // Every held value with 2 * v < x ranks below the cut, so the
            // prefix query totals exactly the later entries x more than
            // doubles — and querying before inserting keeps x from counting
            // itself.
            count += query(bit, lowerBound(doubled, x));
            update(bit, m, lowerBound(vals, x) + 1, 1);
        }
        return (int) count;
    }

    private void update(int[] bit, int size, int i, int delta) {
        while (i <= size) {
            bit[i] += delta;
            i += i & -i;
        }
    }

    private int query(int[] bit, int i) {
        int total = 0;
        while (i > 0) {
            total += bit[i];
            i -= i & -i;
        }
        return total;
    }

    private int lowerBound(long[] a, long target) {
        int lo = 0;
        int hi = a.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (a[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
