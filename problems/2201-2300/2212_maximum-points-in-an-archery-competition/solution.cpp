class Solution {
  public:
    vector<int> maximumBobPoints(int numArrows, vector<int> &aliceArrows) {
        // Winning section k costs aliceArrows[k] + 1 arrows and pays k
        // points, so with only 12 sections every affordable winning set can
        // be swept.
        int bestPoints = 0;
        int bestMask = 0;
        for (int mask = 1; mask < (1 << 12); mask++) {
            int cost = 0;
            int points = 0;
            for (int k = 0; k < 12; k++) {
                if (mask >> k & 1) {
                    cost += aliceArrows[k] + 1;
                    points += k;
                }
            }
            // Strict improvement keeps the smallest mask on ties, which pins
            // one deterministic answer among equally scoring allocations.
            if (cost <= numArrows && points > bestPoints) {
                bestPoints = points;
                bestMask = mask;
            }
        }
        vector<int> bob(12, 0);
        int spent = 0;
        for (int k = 1; k < 12; k++) {
            if (bestMask >> k & 1) {
                bob[k] = aliceArrows[k] + 1;
                spent += bob[k];
            }
        }
        // Section 0 scores nothing, so every unspent arrow lands there.
        bob[0] = numArrows - spent;
        return bob;
    }
};
