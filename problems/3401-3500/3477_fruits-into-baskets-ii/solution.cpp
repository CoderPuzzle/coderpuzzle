class Solution {
  public:
    int numOfUnplacedFruits(vector<int> &fruits, vector<int> &baskets) {
        // The rules fix every decision, so simulate them directly: each fruit
        // takes the leftmost free basket that fits, scanning from index 0.
        vector<bool> used(baskets.size(), false);
        int unplaced = 0;
        for (int quantity : fruits) {
            int j = 0;
            // skip occupied baskets and capacities that are too small
            while (j < (int)baskets.size() && (used[j] || baskets[j] < quantity)) {
                ++j;
            }
            // scan ran off the end: nothing fits this fruit
            if (j == (int)baskets.size()) {
                ++unplaced;
            } else {
                used[j] = true;
            }
        }
        return unplaced;
    }
};
