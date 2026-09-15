class Solution {

    public int minFlips(String s) {
        // Track how much of each forbidden pattern ("011", "110") is already
        // matched as a subsequence of the string built so far. State (a, b)
        // means the first a chars of "011" and b chars of "110" are matched;
        // reaching 3 is dead. Costs are minimum flips per state.
        int[][] dp = new int[4][4];
        for (int[] row : dp) java.util.Arrays.fill(row, Integer.MAX_VALUE);
        dp[0][0] = 0;
        String p1 = "011";
        String p2 = "110";
        for (int i = 0; i < s.length(); i++) {
            int[][] next = new int[4][4];
            for (int[] row : next) java.util.Arrays.fill(row, Integer.MAX_VALUE);
            char c = s.charAt(i);
            for (int a = 0; a < 3; a++) {
                for (int b = 0; b < 3; b++) {
                    int cost = dp[a][b];
                    if (cost == Integer.MAX_VALUE) continue;
                    for (char put = '0'; put <= '1'; put++) {
                        int total = cost + (put != c ? 1 : 0);
                        int na = put == p1.charAt(a) ? a + 1 : a;
                        int nb = put == p2.charAt(b) ? b + 1 : b;
                        if (na == 3 || nb == 3) continue;
                        if (total < next[na][nb]) next[na][nb] = total;
                    }
                }
            }
            dp = next;
        }
        int answer = Integer.MAX_VALUE;
        for (int a = 0; a < 3; a++) for (int b = 0; b < 3; b++) answer = Math.min(answer, dp[a][b]);
        return answer;
    }
}
