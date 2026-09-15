import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    private int[] quotients;
    private int[][] sortedNodes;
    private long[][] prefixNodes;

    public long[] minOperations(int[] nums, int k, int[][] queries) {
        int n = nums.length;
        // Remainder runs: a window is equalizable iff it sits inside one
        // maximal run of equal remainders, i.e. iff l and r share a mark.
        int[] run = new int[n];
        for (int i = 1; i < n; i++) {
            run[i] = run[i - 1] + (nums[i] % k != nums[i - 1] % k ? 1 : 0);
        }
        quotients = new int[n];
        for (int i = 0; i < n; i++) {
            quotients[i] = nums[i] / k;
        }
        // Merge sort tree over the quotients: each node keeps its values
        // sorted plus prefix sums of that order.
        sortedNodes = new int[4 * n][];
        prefixNodes = new long[4 * n][];
        build(1, 0, n - 1);
        long[] result = new long[queries.length];
        Deque<int[]> stack = new ArrayDeque<>();
        List<int[]> pieceVals = new ArrayList<>();
        List<long[]> piecePref = new ArrayList<>();
        for (int qi = 0; qi < queries.length; qi++) {
            int l = queries[qi][0],
                r = queries[qi][1];
            if (run[l] != run[r]) {
                result[qi] = -1;
                continue;
            }
            // Decompose the window into tree nodes; the set stays fixed
            // for the whole query.
            pieceVals.clear();
            piecePref.clear();
            stack.push(new int[] { 1, 0, n - 1 });
            while (!stack.isEmpty()) {
                int[] top = stack.pop();
                int node = top[0],
                    lo = top[1],
                    hi = top[2];
                if (r < lo || hi < l) {
                    continue;
                }
                if (l <= lo && hi <= r) {
                    pieceVals.add(sortedNodes[node]);
                    piecePref.add(prefixNodes[node]);
                    continue;
                }
                int mid = (lo + hi) >>> 1;
                stack.push(new int[] { 2 * node, lo, mid });
                stack.push(new int[] { 2 * node + 1, mid + 1, hi });
            }
            // Smallest quotient whose inclusive rank reaches the lower
            // median; the decomposition's node set is fixed throughout.
            long need = ((long) (r - l) + 2) / 2;
            long lo = Long.MAX_VALUE,
                hi = Long.MIN_VALUE;
            for (int[] vec : pieceVals) {
                lo = Math.min(lo, vec[0]);
                hi = Math.max(hi, vec[vec.length - 1]);
            }
            while (lo < hi) {
                long mid = lo + (hi - lo) / 2;
                if (countLeSum(piecePref, pieceVals, mid)[0] >= need) {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            long median = lo;
            long size = r - l + 1L;
            long[] at = countLeSum(piecePref, pieceVals, median);
            long[] below = countLeSum(piecePref, pieceVals, median - 1);
            long grandTotal = 0;
            for (long[] pref : piecePref) {
                grandTotal += pref[pref.length - 1];
            }
            // Below-median elements climb by their shortfall; above-median
            // ones descend by their excess; equals cost nothing.
            result[qi] = median * below[0] - below[1] + (grandTotal - at[1] - median * (size - at[0]));
        }
        return result;
    }

    private void build(int node, int lo, int hi) {
        if (lo == hi) {
            sortedNodes[node] = new int[] { quotients[lo] };
            prefixNodes[node] = new long[] { 0, quotients[lo] };
            return;
        }
        int mid = (lo + hi) >>> 1;
        build(2 * node, lo, mid);
        build(2 * node + 1, mid + 1, hi);
        int[] left = sortedNodes[2 * node],
            right = sortedNodes[2 * node + 1];
        int[] merged = new int[left.length + right.length];
        int a = 0,
            b = 0,
            w = 0;
        while (a < left.length && b < right.length) {
            merged[w++] = left[a] <= right[b] ? left[a++] : right[b++];
        }
        while (a < left.length) {
            merged[w++] = left[a++];
        }
        while (b < right.length) {
            merged[w++] = right[b++];
        }
        long[] pref = new long[merged.length + 1];
        for (int i = 0; i < merged.length; i++) {
            pref[i + 1] = pref[i] + merged[i];
        }
        sortedNodes[node] = merged;
        prefixNodes[node] = pref;
    }

    private long[] countLeSum(List<long[]> prefixes, List<int[]> pieces, long x) {
        long count = 0,
            total = 0;
        for (int p = 0; p < pieces.size(); p++) {
            int[] vec = pieces.get(p);
            long[] pref = prefixes.get(p);
            int low = 0,
                high = vec.length;
            while (low < high) {
                int mid = (low + high) >>> 1;
                if ((long) vec[mid] <= x) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            count += low;
            total += pref[low];
        }
        return new long[] { count, total };
    }

    private long[] countLe(List<int[]> pieces, long x) {
        long count = 0;
        for (int[] vec : pieces) {
            int low = 0,
                high = vec.length;
            while (low < high) {
                int mid = (low + high) >>> 1;
                if ((long) vec[mid] <= x) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            count += low;
        }
        return new long[] { count, 0 };
    }
}
