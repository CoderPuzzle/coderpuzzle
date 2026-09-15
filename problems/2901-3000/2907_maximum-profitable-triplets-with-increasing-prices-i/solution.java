import java.util.Arrays;

class Solution {

    public int maxProfit(int[] prices, int[] profits) {
        // Fix the middle item j. Two Fenwick (binary indexed) trees over the
        // compressed price ranks answer, for every j, the maximum profit
        // among earlier items priced strictly below prices[j] and among
        // later items priced strictly above prices[j]; the right pass runs
        // the same prefix queries over reversed ranks. Every profit is >= 1,
        // so a query result of 0 means "no such item exists".
        int n = prices.length;
        int[] ranks = prices.clone();
        Arrays.sort(ranks);
        int m = 0;
        for (int p : ranks) {
            if (m == 0 || ranks[m - 1] != p) {
                ranks[m++] = p;
            }
        }
        int[] tree = new int[m + 1];
        int[] left = new int[n];
        for (int j = 0; j < n; ++j) {
            int r = rankOf(ranks, m, prices[j]);
            left[j] = query(tree, r - 1);
            update(tree, m, r, profits[j]);
        }
        Arrays.fill(tree, 0);
        int[] right = new int[n];
        for (int j = n - 1; j >= 0; --j) {
            int r = m + 1 - rankOf(ranks, m, prices[j]);
            right[j] = query(tree, r - 1);
            update(tree, m, r, profits[j]);
        }
        int best = -1;
        for (int j = 0; j < n; ++j) {
            if (left[j] > 0 && right[j] > 0) {
                best = Math.max(best, left[j] + profits[j] + right[j]);
            }
        }
        return best;
    }

    private int rankOf(int[] ranks, int m, int p) {
        int lo = 0;
        int hi = m;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (ranks[mid] < p) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo + 1;
    }

    private int query(int[] tree, int i) {
        int best = 0;
        while (i > 0) {
            best = Math.max(best, tree[i]);
            i -= i & -i;
        }
        return best;
    }

    private void update(int[] tree, int m, int i, int gain) {
        while (i <= m) {
            tree[i] = Math.max(tree[i], gain);
            i += i & -i;
        }
    }
}
