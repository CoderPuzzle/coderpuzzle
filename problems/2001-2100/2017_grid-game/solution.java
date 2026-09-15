class Solution {

    public long gridGame(int[][] grid) {
        long topRemaining = 0;
        for (int points : grid[0]) {
            topRemaining += points;
        }

        long bottomPrefix = 0;
        long answer = Long.MAX_VALUE;
        for (int column = 0; column < grid[0].length; ++column) {
            topRemaining -= grid[0][column];
            answer = Math.min(answer, Math.max(topRemaining, bottomPrefix));
            bottomPrefix += grid[1][column];
        }
        return answer;
    }
}
