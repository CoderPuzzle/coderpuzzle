class Solution {

    public int minimumTotal(int[][] triangle) {
        int n = triangle.length;
        // Top-down mirror of the bottom-up DP: best[i] = minimum path sum
        // from the apex down to column i of the current row.
        int[] best = new int[n];
        best[0] = triangle[0][0];
        int width = 1;
        for (int row = 1; row < n; row++) {
            int[] cur = triangle[row];
            int[] nxt = new int[cur.length];
            // A cell descends from column i-1 or i of the row above, so
            // both ragged edge cells have a single parent.
            nxt[0] = cur[0] + best[0];
            for (int i = 1; i < cur.length - 1; i++) {
                nxt[i] = cur[i] + Math.min(best[i - 1], best[i]);
            }
            nxt[cur.length - 1] = cur[cur.length - 1] + best[width - 1];
            best = nxt;
            width = cur.length;
        }
        // The answer is the cheapest cell on the final row.
        int answer = best[0];
        for (int i = 1; i < width; i++) {
            answer = Math.min(answer, best[i]);
        }
        return answer;
    }
}
