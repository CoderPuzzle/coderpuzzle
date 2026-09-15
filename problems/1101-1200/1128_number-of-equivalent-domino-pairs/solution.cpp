class Solution {
  public:
    int numEquivDominoPairs(vector<vector<int>> &dominoes) {
        // Canonical orientation (min, max) collapses a domino and its
        // rotation to one cell of a 9x9 table.
        int table[10][10] = {};
        long long pairs = 0;
        for (const vector<int> &domino : dominoes) {
            int lo = min(domino[0], domino[1]);
            int hi = max(domino[0], domino[1]);
            // Every earlier domino in this cell pairs with the current one.
            pairs += table[lo][hi];
            table[lo][hi]++;
        }
        return (int)pairs;
    }
};
