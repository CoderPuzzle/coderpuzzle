class Solution {

    public long maxScore(int n, int[][] edges) {
        // Connected with every degree <= 2, the graph is one path
        // (m == n - 1) or one cycle (m == n). Pendulum the values 1..n —
        // 1, 3, 5, ... then ..., 6, 4, 2 — so the largest values sit side
        // by side. Scores reach ~n^3/6 ≈ 2e13, so long, not int.
        int[] seq = new int[n];
        int idx = 0;
        for (int v = 1; v <= n; v += 2) {
            seq[idx++] = v;
        }
        for (int v = n % 2 == 0 ? n : n - 1; v >= 2; v -= 2) {
            seq[idx++] = v;
        }
        long score = 0;
        for (int i = 0; i + 1 < n; i++) {
            score += (long) seq[i] * seq[i + 1];
        }
        if (edges.length == n) {
            score += (long) seq[0] * seq[n - 1];
        }
        return score;
    }
}
