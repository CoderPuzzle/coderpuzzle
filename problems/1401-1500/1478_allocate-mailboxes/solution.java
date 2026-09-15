import java.util.Arrays;

class Solution {

    private int[] houses;
    private int[][] memo;

    public int minDistance(int[] houses, int k) {
        this.houses = houses;
        Arrays.sort(houses);
        int n = houses.length;
        this.memo = new int[n][k + 1];
        for (int[] row : memo) {
            Arrays.fill(row, -1);
        }
        return dp(0, k);
    }

    private int runCost(int i, int j) {
        int total = 0;
        int lo = i,
            hi = j;
        while (lo < hi) {
            total += houses[hi] - houses[lo];
            lo++;
            hi--;
        }
        return total;
    }

    private int dp(int i, int boxes) {
        int remaining = houses.length - i;
        if (boxes >= remaining) {
            return 0;
        }
        if (memo[i][boxes] != -1) {
            return memo[i][boxes];
        }
        if (boxes == 1) {
            return (memo[i][boxes] = runCost(i, houses.length - 1));
        }
        int best = Integer.MAX_VALUE / 2;
        for (int j = i; j <= houses.length - boxes; j++) {
            best = Math.min(best, runCost(i, j) + dp(j + 1, boxes - 1));
        }
        return (memo[i][boxes] = best);
    }
}
