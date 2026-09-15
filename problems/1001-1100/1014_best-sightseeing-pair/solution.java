class Solution {

    public int maxScoreSightseeingPair(int[] values) {
        int bestPrefix = values[0]; // max of values[i] + i seen so far
        int best = Integer.MIN_VALUE;
        for (int j = 1; j < values.length; j++) {
            int score = bestPrefix + values[j] - j;
            if (score > best) {
                best = score;
            }
            if (values[j] + j > bestPrefix) {
                bestPrefix = values[j] + j;
            }
        }
        return best;
    }
}
