class Solution {

    public int maxScore(int[][] g) {
        int ans = Integer.MIN_VALUE;
        for (int[] a : g) {
            int e = a[0];
            for (int i = 1; i < a.length; i++) {
                int z = e + a[i];
                ans = Math.max(ans, z);
                e = Math.max(a[i], z);
            }
        }
        for (int j = 0; j < g[0].length; j++) {
            int e = g[0][j];
            for (int i = 1; i < g.length; i++) {
                int z = e + g[i][j];
                ans = Math.max(ans, z);
                e = Math.max(g[i][j], z);
            }
        }
        for (int i = 1; i + 1 < g.length; i++) for (int j = 1; j + 1 < g[0].length; j++) ans = Math.max(ans, g[i][j]);
        return ans;
    }
}
