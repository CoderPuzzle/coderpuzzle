import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public long minInversionCount(int[] nums, int k) {
        // Two neighboring windows share k - 1 elements, so the inversion
        // count updates in O(log n) per slide instead of a recount: the
        // element leaving at the front loses its pairs with smaller
        // survivors, the element entering at the back gains pairs with
        // larger survivors. Both are dynamic rank queries over the window's
        // values, so keep the window's elements counted in a Fenwick tree
        // indexed by compressed value.
        //
        // Order matters on every slide: drop the front element from the tree
        // and subtract how many smaller elements it was paired with BEFORE
        // the new element joins, then insert the newcomer and add how many
        // strictly larger elements remain — querying against the wrong
        // intermediate window double-counts when the two values are equal.
        // Strict comparisons throughout: equal neighbors are not inversions.
        int[] vals = nums.clone();
        Arrays.sort(vals);
        int m = 0;
        for (int i = 0; i < vals.length; i++) {
            if (i == 0 || vals[i] != vals[i - 1]) {
                vals[m++] = vals[i];
            }
        }
        Map<Integer, Integer> rank = new HashMap<>();
        for (int i = 0; i < m; i++) {
            rank.put(vals[i], i + 1);
        }
        long[] tree = new long[m + 1];
        // The running count reaches k * (k - 1) / 2 — past int range when
        // the window grows past ~65535 elements — so accumulate in long.
        // Tree cells hold long only to keep query() addition simple.
        long inversions = 0;
        for (int i = 0; i < k; ++i) {
            int rx = rank.get(nums[i]);
            inversions += i - query(tree, rx);
            update(tree, m, rx, 1);
        }
        long best = inversions;
        for (int right = k; right < nums.length; ++right) {
            int ry = rank.get(nums[right - k]);
            int rx = rank.get(nums[right]);
            inversions -= query(tree, ry - 1);
            update(tree, m, ry, -1);
            inversions += k - 1 - query(tree, rx);
            update(tree, m, rx, 1);
            best = Math.min(best, inversions);
        }
        return best;
    }

    private static long query(long[] tree, int index) {
        long total = 0;
        while (index > 0) {
            total += tree[index];
            index &= index - 1;
        }
        return total;
    }

    private static void update(long[] tree, int m, int index, int delta) {
        while (index <= m) {
            tree[index] += delta;
            index += index & -index;
        }
    }
}
