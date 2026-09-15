class Solution {
  public:
    int stoneGameVI(vector<int> &aliceValues, vector<int> &bobValues) {
        int n = aliceValues.size();
        // Taking a stone gains your value AND denies the opponent theirs, so
        // both players effectively compete for aliceValues[i] + bobValues[i].
        vector<int> order(n);
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        sort(order.begin(), order.end(),
             [&](int i, int j) { return aliceValues[i] + bobValues[i] > aliceValues[j] + bobValues[j]; });
        long long diff = 0;
        for (int rank = 0; rank < n; rank++) {
            int i = order[rank];
            if (rank % 2 == 0) {
                diff += aliceValues[i]; // Alice picks ranks 0, 2, 4, ...
            } else {
                diff -= bobValues[i]; // Bob picks ranks 1, 3, 5, ...
            }
        }
        return diff > 0 ? 1 : diff < 0 ? -1 : 0;
    }
};
