class Solution {
  public:
    int maxScoreSightseeingPair(vector<int> &values) {
        int bestPrefix = values[0]; // max of values[i] + i seen so far
        int best = numeric_limits<int>::min();
        for (int j = 1; j < (int)values.size(); j++) {
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
};
