import java.util.HashMap;
import java.util.Map;

class Solution {

    public int minTransfers(int[][] transactions) {
        Map<Integer, Integer> balance = new HashMap<>();
        for (int[] t : transactions) {
            balance.merge(t[0], -t[2], Integer::sum);
            balance.merge(t[1], t[2], Integer::sum);
        }
        int count = 0;
        for (int v : balance.values()) {
            if (v != 0) count++;
        }
        int[] debts = new int[count];
        int idx = 0;
        for (int v : balance.values()) {
            if (v != 0) debts[idx++] = v;
        }
        // Only nonzero net balances matter: any zero-sum group of s people
        // settles in s-1 transfers, so maximizing the group count g of a
        // partition minimizes the total n - g.
        int n = debts.length;
        if (n == 0) return 0;

        int total = 1 << n;
        // Subset sums built incrementally via the lowest set bit; valid
        // marks zero-sum subsets, the candidate groups.
        int[] sums = new int[total];
        boolean[] valid = new boolean[total];
        for (int mask = 1; mask < total; mask++) {
            int lsb = mask & -mask;
            int bit = Integer.numberOfTrailingZeros(lsb);
            sums[mask] = sums[mask ^ lsb] + debts[bit];
            valid[mask] = sums[mask] == 0;
        }

        // dp[mask] = most disjoint valid groups partitioning mask; NEG means
        // "not exactly partitionable", so only full covers add.
        int NEG = -1000000000;
        int[] dp = new int[total];
        java.util.Arrays.fill(dp, NEG);
        dp[0] = 0;
        for (int mask = 1; mask < total; mask++) {
            int sub = mask;
            while (sub != 0) {
                if (valid[sub] && dp[mask ^ sub] != NEG) {
                    dp[mask] = Math.max(dp[mask], dp[mask ^ sub] + 1);
                }
                sub = (sub - 1) & mask;
            }
        }
        // Fewest transactions = n balances minus the best group count.
        return n - dp[total - 1];
    }
}
