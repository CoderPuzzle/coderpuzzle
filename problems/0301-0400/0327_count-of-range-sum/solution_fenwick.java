import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int countRangeSum(int[] nums, int lower, int upper) {
        int n = nums.length;
        // Range sums become pairs: count i < j with
        // prefix[j] - prefix[i] in [lower, upper] (leading 0 included).
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        // Fenwick tree over the coordinate-compressed prefix values: rank r
        // (1-based) counts how many inserted prefixes carry ranks[r - 1].
        long[] ranks = uniqueSorted(prefix);
        int m = ranks.length;
        int[] tree = new int[m + 1];
        long count = 0;
        add(prefix[0], ranks, tree, m);
        for (int j = 1; j <= n; j++) {
            long p = prefix[j];
            // An earlier prefix e qualifies when lower <= p - e <= upper,
            // i.e. e lies in [p - upper, p - lower]; both bounds come off
            // the tree as rank-prefix counts.
            count += countAtMost(p - lower, ranks, tree) - countAtMost(p - upper - 1, ranks, tree);
            // Insert only after querying, so a prefix never pairs itself.
            add(p, ranks, tree, m);
        }
        return (int) count;
    }

    private long[] uniqueSorted(long[] values) {
        long[] sorted = values.clone();
        Arrays.sort(sorted);
        List<Long> unique = new ArrayList<>();
        for (int i = 0; i < sorted.length; i++) {
            if (i == 0 || sorted[i] != sorted[i - 1]) {
                unique.add(sorted[i]);
            }
        }
        long[] ranks = new long[unique.size()];
        for (int i = 0; i < ranks.length; i++) {
            ranks[i] = unique.get(i);
        }
        return ranks;
    }

    private void add(long value, long[] ranks, int[] tree, int m) {
        // Rank of the first entry greater than value (it exists: value is in
        // ranks), which is the 1-based slot of value itself.
        int rank = upperBound(ranks, value);
        for (; rank <= m; rank += rank & -rank) {
            tree[rank]++;
        }
    }

    private int countAtMost(long bound, long[] ranks, int[] tree) {
        // How many inserted prefixes are at most bound.
        int rank = upperBound(ranks, bound);
        int total = 0;
        for (; rank > 0; rank -= rank & -rank) {
            total += tree[rank];
        }
        return total;
    }

    private int upperBound(long[] ranks, long bound) {
        int lo = 0,
            hi = ranks.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (ranks[mid] <= bound) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
