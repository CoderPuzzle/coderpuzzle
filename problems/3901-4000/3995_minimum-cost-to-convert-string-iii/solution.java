class Solution {

    public int minCost(String s, String t, String[][] rules, int[] costs) {
        int n = s.length(),
            INF = 1000000000;
        int[] dp = new int[n + 1];
        java.util.Arrays.fill(dp, INF);
        dp[0] = 0;
        for (int i = 0; i < n; i++) {
            if (dp[i] == INF) continue;
            if (s.charAt(i) == t.charAt(i)) dp[i + 1] = Math.min(dp[i + 1], dp[i]);
            for (int q = 0; q < rules.length; q++) {
                String p = rules[q][0],
                    r = rules[q][1];
                int z = p.length();
                if (i + z > n || !t.regionMatches(i, r, 0, z)) continue;
                boolean ok = true;
                int stars = 0;
                for (int j = 0; j < z; j++) {
                    if (p.charAt(j) == '*') stars++;
                    else if (p.charAt(j) != s.charAt(i + j)) ok = false;
                }
                if (ok) dp[i + z] = Math.min(dp[i + z], dp[i] + costs[q] + stars);
            }
        }
        return dp[n] == INF ? -1 : dp[n];
    }
}
