class Solution {
  public:
    int maxHeight(vector<vector<int>> &cuboids) {
        // Rotations are free, so sort each cuboid's dimensions — largest up
        // is simultaneously tallest and least constrained — then sort the
        // cuboids lexicographically so a potential base precedes its tippers.
        vector<vector<int>> boxes = cuboids;
        for (auto &b : boxes) {
            sort(b.begin(), b.end());
        }
        sort(boxes.begin(), boxes.end());
        int n = boxes.size();
        // dp[i]: tallest stack with cuboid i on top.
        vector<int> dp(n);
        int best = 0;
        for (int i = 0; i < n; i++) {
            dp[i] = boxes[i][2];
            // An earlier j whose sorted triple is component-wise <= i's can
            // support it (non-strict: equal dimensions may touch).
            for (int j = 0; j < i; j++) {
                if (boxes[j][0] <= boxes[i][0] && boxes[j][1] <= boxes[i][1] && boxes[j][2] <= boxes[i][2]) {
                    dp[i] = max(dp[i], dp[j] + boxes[i][2]);
                }
            }
            best = max(best, dp[i]);
        }
        return best;
    }
};
