import java.util.Arrays;

class Solution {

    public long[] maximumCoins(int[] heroes, int[] monsters, int[] coins) {
        // A hero that beats one monster beats every monster of smaller-or-equal
        // power too, so sorting (power, coin) pairs makes each answer a prefix
        // sum over that order: binary-search how many monsters sit at or below
        // the hero's power and read prefix[k]. Totals reach 10^5 * 10^9 = 10^11,
        // past int range, so counts and sums run in long.
        int m = monsters.length;
        Integer[] order = new Integer[m];
        for (int i = 0; i < m; ++i) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> Integer.compare(monsters[a], monsters[b]));
        long[] prefix = new long[m + 1];
        for (int i = 0; i < m; ++i) {
            prefix[i + 1] = prefix[i] + coins[order[i]];
        }
        long[] ans = new long[heroes.length];
        for (int i = 0; i < heroes.length; ++i) {
            int lo = 0;
            int hi = m;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (monsters[order[mid]] <= heroes[i]) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            ans[i] = prefix[lo];
        }
        return ans;
    }
}
