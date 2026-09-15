class Solution {

    public int unhappyFriends(int n, int[][] preferences, int[][] pairs) {
        // rank[i][j] = how highly friend i ranks friend j (lower = more preferred).
        int[][] rank = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int position = 0; position < preferences[i].length; position++) {
                rank[i][preferences[i][position]] = position;
            }
        }

        int[] partner = new int[n];
        for (int[] pair : pairs) {
            partner[pair[0]] = pair[1];
            partner[pair[1]] = pair[0];
        }

        int unhappy = 0;
        for (int x = 0; x < n; x++) {
            int y = partner[x];
            for (int u = 0; u < n; u++) {
                if (u == x || u == y) {
                    continue;
                }
                int v = partner[u];
                if (rank[x][u] < rank[x][y] && rank[u][x] < rank[u][v]) {
                    unhappy++;
                    break;
                }
            }
        }
        return unhappy;
    }
}
