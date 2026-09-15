class Solution {
  public:
    int maxWeight(vector<int> &weights, int w1, int w2) {
        // Row a is one wide integer whose bit j marks state (a, j) as
        // reachable: bag 1 filled to exactly a, bag 2 to exactly j. 512
        // bits hold w2 plus any single weight's overshoot; lowMask trims
        // each row back to the w2 + 1 legal occupancies.
        bitset<512> lowMask;
        for (int b = 0; b <= w2; ++b) {
            lowMask.set(b);
        }
        vector<bitset<512>> rows(w1 + 1);
        rows[0].set(0);
        for (int w : weights) {
            // Bag-2 placements shift a whole row left. Stage them before
            // the bag-1 pass below touches rows, so both moves read the
            // previous item's states only.
            vector<bitset<512>> shifted(w1 + 1);
            for (int a = 0; a <= w1; ++a) {
                shifted[a] = (rows[a] << w) & lowMask;
            }
            // Bag-1 placements OR row a - w into row a, walked downward so
            // the merge reads pre-item rows and no item is spent twice.
            for (int a = w1; a >= w; --a) {
                rows[a] |= rows[a - w];
            }
            for (int a = 0; a <= w1; ++a) {
                rows[a] |= shifted[a];
            }
        }
        int best = 0;
        for (int a = 0; a <= w1; ++a) {
            // Fixed a: the best partner is the highest reachable bit.
            for (int b = w2; a + b > best; --b) {
                if (rows[a][b]) {
                    best = a + b;
                    break;
                }
            }
        }
        return best;
    }
};
