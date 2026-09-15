class Solution {

    public int[] colorTheArray(int n, int[][] queries) {
        // Only the painted cell's two neighbor pairs can flip status in
        // one query: score their contribution before the repaint, then
        // after, and slide the running total by the difference. Zero
        // stays "uncolored", so a pair only counts when both sides are
        // non-zero and equal.
        int[] colors = new int[n];
        int same = 0;
        int[] answer = new int[queries.length];
        for (int q = 0; q < queries.length; ++q) {
            int index = queries[q][0];
            int color = queries[q][1];
            for (int j : new int[] { index - 1, index + 1 }) {
                if (j >= 0 && j < n && colors[j] != 0 && colors[j] == colors[index]) {
                    same--;
                }
            }
            colors[index] = color;
            for (int j : new int[] { index - 1, index + 1 }) {
                if (j >= 0 && j < n && colors[j] != 0 && colors[j] == color) {
                    same++;
                }
            }
            answer[q] = same;
        }
        return answer;
    }
}
