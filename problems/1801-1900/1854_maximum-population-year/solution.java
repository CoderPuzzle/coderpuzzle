class Solution {

    // Difference array over years: +1 at birth, -1 at death; a prefix sweep
    // reconstructs each year's population.
    public int maximumPopulation(int[][] logs) {
        int[] delta = new int[2052];
        for (int[] log : logs) {
            delta[log[0]]++;
            delta[log[1]]--;
        }
        int bestYear = 1950;
        int bestPop = -1;
        int cur = 0;
        for (int year = 1950; year <= 2050; year++) {
            cur += delta[year];
            if (cur > bestPop) {
                bestPop = cur;
                bestYear = year;
            }
        }
        return bestYear;
    }
}
