class Solution {

    public int winningPlayerCount(int n, int[][] pick) {
        int[][] counts = new int[n][11];
        for (int[] p : pick) {
            counts[p[0]][p[1]]++;
        }

        int winners = 0;
        for (int player = 0; player < n; player++) {
            int best = 0;
            for (int color = 0; color <= 10; color++) {
                best = Math.max(best, counts[player][color]);
            }
            if (best > player) {
                winners++;
            }
        }
        return winners;
    }
}
