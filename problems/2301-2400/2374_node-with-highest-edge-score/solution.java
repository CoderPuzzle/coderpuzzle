class Solution {

    public int edgeScore(int[] edges) {
        // Node edges[i] gains i to its score, so one accumulation pass fills
        // every score; a second pass picks the highest with the smallest
        // index (strict > keeps the earlier node on ties). Scores reach
        // ~n^2/2 = 5e9, so accumulate in 64 bits.
        long[] scores = new long[edges.length];
        for (int source = 0; source < edges.length; ++source) {
            scores[edges[source]] += source;
        }
        int bestNode = 0;
        for (int node = 1; node < scores.length; ++node) {
            if (scores[node] > scores[bestNode]) {
                bestNode = node;
            }
        }
        return bestNode;
    }
}
