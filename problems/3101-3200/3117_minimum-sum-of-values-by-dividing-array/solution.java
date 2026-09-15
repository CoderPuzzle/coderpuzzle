import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int minimumValueSum(int[] nums, int[] andValues) {
        // Layered DP: g[k] after j rounds = min value sum splitting nums[:k]
        // into exactly j segments matching andValues[:j]. For a fixed right
        // end r the starts l with AND(nums[l..r]) == t form ONE contiguous
        // run inside the classic AND-group list (extending r folds every
        // stored value with nums[r]; equal results merge into one range),
        // so a transition is a range-minimum over the previous layer,
        // served by a small iterative segment tree. Costs stay below
        // m * max(nums) < 10^6, well inside an int.
        int n = nums.length;
        final int INFTY = 1 << 30;
        List<int[]> groupVals = new ArrayList<>();
        List<int[]> groupStarts = new ArrayList<>();
        int[] vals = new int[0];
        int[] starts = new int[0];
        for (int r = 0; r < n; ++r) {
            int x = nums[r];
            int[] nvals = new int[vals.length + 1];
            int[] nstarts = new int[vals.length + 1];
            int len = 0;
            nvals[len] = x;
            nstarts[len] = r;
            ++len;
            for (int i = 0; i < vals.length; ++i) {
                int v = vals[i] & x;
                if (v != nvals[len - 1]) {
                    nvals[len] = v;
                    nstarts[len] = starts[i];
                    ++len;
                } else {
                    // Same value again: the older group's whole start run
                    // merges into the current tail, anchored further left.
                    nstarts[len - 1] = starts[i];
                }
            }
            vals = Arrays.copyOf(nvals, len);
            starts = Arrays.copyOf(nstarts, len);
            groupVals.add(vals);
            groupStarts.add(starts);
        }

        int[] prev = new int[n + 1];
        Arrays.fill(prev, INFTY);
        prev[0] = 0;
        int size = n + 1;
        for (int target : andValues) {
            int[] tree = new int[2 * size];
            Arrays.fill(tree, INFTY);
            for (int k = 0; k < size; ++k) tree[size + k] = prev[k];
            for (int k = size - 1; k > 0; --k) tree[k] = Math.min(tree[2 * k], tree[2 * k + 1]);

            int[] cur = new int[n + 1];
            Arrays.fill(cur, INFTY);
            for (int r = 0; r < n; ++r) {
                int[] valsR = groupVals.get(r);
                int[] startsR = groupStarts.get(r);
                int lo = -1,
                    hi = -2;
                for (int gi = 0; gi < valsR.length; ++gi) {
                    if (valsR[gi] == target) {
                        lo = startsR[gi];
                        hi = gi > 0 ? startsR[gi - 1] - 1 : r;
                        break;
                    }
                }
                if (lo < 0) continue; // this target cannot end at r
                int best = INFTY;
                for (int l = lo + size, rr = hi + 1 + size; l < rr; l >>= 1, rr >>= 1) {
                    if ((l & 1) == 1) best = Math.min(best, tree[l++]);
                    if ((rr & 1) == 1) best = Math.min(best, tree[--rr]);
                }
                if (best < INFTY) cur[r + 1] = best + nums[r];
            }
            prev = cur;
        }

        return prev[n] < INFTY ? prev[n] : -1;
    }
}
