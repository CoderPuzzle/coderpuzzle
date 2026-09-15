import java.util.Arrays;

class Solution {

    public int shoppingOffers(int[] price, int[][] special, int[] needs) {
        // Memoized DFS over the remaining-needs vector. Every state offers
        // the same two move kinds: buy one unit of any still-wanted item at
        // its list price, or apply any special offer that fits inside the
        // state — the fit check is what forbids buying more than wanted.
        int n = price.length;
        int size = 1;
        for (int i = 0; i < n; ++i) {
            size *= 11;
        }
        int[] memo = new int[size];
        Arrays.fill(memo, -1);
        return dfs(price, special, memo, needs.clone());
    }

    private int dfs(int[] price, int[][] special, int[] memo, int[] cur) {
        int n = price.length;
        // Counts stay at most 10, so cur packs into one base-11 integer.
        int key = 0;
        boolean empty = true;
        for (int i = 0; i < n; ++i) {
            key = key * 11 + cur[i];
            if (cur[i] > 0) {
                empty = false;
            }
        }
        if (empty) {
            return 0;
        }
        if (memo[key] != -1) {
            return memo[key];
        }
        int best = Integer.MAX_VALUE / 2;
        // Move kind 1: one unit of item i, bought individually.
        for (int i = 0; i < n; ++i) {
            if (cur[i] > 0) {
                --cur[i];
                best = Math.min(best, price[i] + dfs(price, special, memo, cur));
                ++cur[i];
            }
        }
        // Move kind 2: a special offer, when it fits within cur.
        for (int[] offer : special) {
            boolean fits = true;
            for (int j = 0; j < n; ++j) {
                if (offer[j] > cur[j]) {
                    fits = false;
                    break;
                }
            }
            if (fits) {
                for (int j = 0; j < n; ++j) {
                    cur[j] -= offer[j];
                }
                best = Math.min(best, offer[n] + dfs(price, special, memo, cur));
                for (int j = 0; j < n; ++j) {
                    cur[j] += offer[j];
                }
            }
        }
        memo[key] = best;
        return best;
    }
}
