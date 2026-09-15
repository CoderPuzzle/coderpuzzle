class Solution {
  public:
    vector<vector<int>> reconstructMatrix(int upper, int lower, vector<int> &colsum) {
        const int n = static_cast<int>(colsum.size());
        int twos = static_cast<int>(count(colsum.begin(), colsum.end(), 2));
        int ones = static_cast<int>(count(colsum.begin(), colsum.end(), 1));
        // Every 2 spends one from each row; the top row cannot exceed its cap.
        if (2 * twos + ones != upper + lower || upper < twos || upper > twos + ones) {
            return {};
        }
        // First (upper - twos) free columns go on top; nothing else is chosen.
        int freeTop = upper - twos;
        vector<int> top(n, 0), bottom(n, 0);
        for (int i = 0; i < n; ++i) {
            if (colsum[i] == 2) {
                top[i] = bottom[i] = 1;
            } else if (colsum[i] == 1) {
                if (freeTop > 0) {
                    top[i] = 1;
                    --freeTop;
                } else {
                    bottom[i] = 1;
                }
            }
        }
        return {top, bottom};
    }
};
