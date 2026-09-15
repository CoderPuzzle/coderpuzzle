import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {

    private long[] countBit;
    private long[] sumBit;
    private long[] vals;
    private int m;

    public long minimumCost(int[] nums, int k, int dist) {
        int n = nums.length;
        int target = k - 2;
        vals = new long[n];
        for (int i = 0; i < n; i++) vals[i] = nums[i];
        Arrays.sort(vals);
        m = 0;
        for (int i = 0; i < n; i++) {
            if (i == 0 || vals[i] != vals[i - 1]) vals[m++] = vals[i];
        }
        Map<Long, Integer> posOf = new HashMap<>();
        for (int i = 0; i < m; i++) posOf.put(vals[i], i);

        countBit = new long[m + 1];
        sumBit = new long[m + 1];

        long ans = Long.MAX_VALUE;
        int right0 = Math.min(1 + dist, n - 1);
        for (int p = 2; p <= right0; p++) {
            addValue(nums[p], posOf);
        }

        for (int i1 = 1; i1 < n; i1++) {
            int left = i1 + 1;
            int right = Math.min(i1 + dist, n - 1);
            if (right - left + 1 >= target) {
                long cost = nums[0] + nums[i1] + sumKSmallest(target);
                if (cost < ans) ans = cost;
            }
            if (left <= n - 1) {
                removeValue(nums[left], posOf);
            }
            int newRight = i1 + 1 + dist;
            if (newRight <= n - 1) {
                addValue(nums[newRight], posOf);
            }
        }
        return ans;
    }

    private void fenAdd(long[] bit, int index, long delta) {
        int i = index + 1;
        while (i <= m) {
            bit[i] += delta;
            i += i & -i;
        }
    }

    private long fenPrefix(long[] bit, int index) {
        // sum over [0, index]; index may be < 0
        if (index < 0) return 0;
        if (index >= m) index = m - 1;
        int i = index + 1;
        long total = 0;
        while (i > 0) {
            total += bit[i];
            i -= i & -i;
        }
        return total;
    }

    // 0-based index of the targetK-th smallest element (targetK >= 1)
    private int kth(int targetK) {
        int idx = 0;
        int bitmask = Integer.highestOneBit(m);
        int remaining = targetK;
        while (bitmask > 0) {
            int nxt = idx + bitmask;
            if (nxt <= m && countBit[nxt] < remaining) {
                idx = nxt;
                remaining -= (int) countBit[nxt];
            }
            bitmask >>= 1;
        }
        return idx;
    }

    private long sumKSmallest(int count) {
        if (count == 0) return 0;
        int idx = kth(count);
        long before = fenPrefix(countBit, idx - 1);
        long sumBefore = fenPrefix(sumBit, idx - 1);
        return sumBefore + (count - before) * vals[idx];
    }

    private void addValue(int v, Map<Long, Integer> posOf) {
        int j = posOf.get((long) v);
        fenAdd(countBit, j, 1);
        fenAdd(sumBit, j, v);
    }

    private void removeValue(int v, Map<Long, Integer> posOf) {
        int j = posOf.get((long) v);
        fenAdd(countBit, j, -1);
        fenAdd(sumBit, j, -((long) v));
    }
}
