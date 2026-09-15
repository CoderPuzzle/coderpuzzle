class Solution {
  public:
    int minCost(vector<vector<int>> &costs) {
        // Cheapest totals that leave house i red, blue, or green; a color
        // may not extend its own ending, which is the adjacency rule.
        int red = costs[0][0], blue = costs[0][1], green = costs[0][2];
        for (int i = 1; i < (int)costs.size(); ++i) {
            // Each next ending is computed from the previous ones before
            // any variable is overwritten.
            int nextRed = costs[i][0] + min(blue, green);
            int nextBlue = costs[i][1] + min(red, green);
            int nextGreen = costs[i][2] + min(red, blue);
            red = nextRed;
            blue = nextBlue;
            green = nextGreen;
        }
        // The last house may end in any color, so the answer is the
        // cheapest of the three surviving endings.
        return min(red, min(blue, green));
    }
};
