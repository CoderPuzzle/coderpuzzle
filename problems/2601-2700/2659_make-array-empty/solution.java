import java.util.Arrays;

class Solution {

    public long countOperationsToEmptyArray(int[] nums) {
        int n = nums.length;
        if (n == 0) return 0;

        long[] tree = new long[n + 1];

        int topBit = Integer.highestOneBit(n);

        for (int i = 1; i <= n; i++) add(tree, n, i, 1);

        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) order[i] = i;
        Arrays.sort(order, (a, b) -> Integer.compare(nums[a], nums[b]));

        long ops = 0;
        int cur = 1;
        int removed = 0;
        for (int idx : order) {
            int pos = idx + 1;
            if (pos >= cur) {
                ops += prefix(tree, pos) - prefix(tree, cur - 1);
            } else {
                ops += prefix(tree, n) - prefix(tree, cur - 1) + prefix(tree, pos);
            }
            add(tree, n, pos, -1);
            removed++;
            int remaining = n - removed;
            if (remaining > 0) {
                int rankAfter = (int) prefix(tree, pos);
                int nextRank = (rankAfter % remaining) + 1;
                cur = kth(tree, n, topBit, nextRank);
            }
        }
        return ops;
    }

    private void add(long[] tree, int n, int i, long delta) {
        for (; i <= n; i += i & -i) tree[i] += delta;
    }

    private long prefix(long[] tree, int i) {
        long s = 0;
        for (; i > 0; i -= i & -i) s += tree[i];
        return s;
    }

    private int kth(long[] tree, int n, int topBit, int k) {
        int idx = 0;
        for (int bit = topBit; bit > 0; bit >>= 1) {
            int nxt = idx + bit;
            if (nxt <= n && tree[nxt] < k) {
                idx = nxt;
                k -= (int) tree[nxt];
            }
        }
        return idx + 1;
    }
}
