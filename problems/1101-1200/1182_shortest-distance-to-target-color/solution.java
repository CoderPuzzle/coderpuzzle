class Solution {

    private static final int INF = Integer.MAX_VALUE;

    public int[] shortestDistanceColor(int[] colors, int[][] queries) {
        int n = colors.length;
        // dist[i][c]: distance from i to nearest color c (1..3).
        int[][] dist = new int[n][4];
        for (int c = 1; c <= 3; c++) {
            // Left-to-right sweep carrying the distance to the most
            // recent occurrence of c.
            int last = INF;
            for (int i = 0; i < n; i++) {
                if (colors[i] == c) {
                    last = 0;
                } else if (last != INF) {
                    last++;
                }
                dist[i][c] = last;
            }
            // Mirror sweep keeps whichever side owns the closer one.
            last = INF;
            for (int i = n - 1; i >= 0; i--) {
                if (colors[i] == c) {
                    last = 0;
                } else if (last != INF) {
                    last++;
                }
                if (last < dist[i][c]) {
                    dist[i][c] = last;
                }
            }
        }
        int[] answer = new int[queries.length];
        for (int q = 0; q < queries.length; q++) {
            int d = dist[queries[q][0]][queries[q][1]];
            answer[q] = d == INF ? -1 : d;
        }
        return answer;
    }
}
