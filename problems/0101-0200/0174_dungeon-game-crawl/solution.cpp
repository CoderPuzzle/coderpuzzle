class Solution {
  public:
    int calculateMinimumHP(vector<vector<int>> &dungeon) {
        // need[j] is the least health that saves the knight from column j of
        // the row being folded; index n is a sentinel wall past the right edge.
        int n = (int)dungeon[0].size();
        vector<int> need(n + 1, 1000000000);
        need[n - 1] = 1;
        for (int i = (int)dungeon.size() - 1; i >= 0; --i) {
            for (int j = n - 1; j >= 0; --j) {
                // Scan right-to-left: need[j] is still the room below while
                // need[j + 1] is already this row, exactly the two moves.
                need[j] = max(1, min(need[j], need[j + 1]) - dungeon[i][j]);
            }
        }
        return need[0];
    }
};
