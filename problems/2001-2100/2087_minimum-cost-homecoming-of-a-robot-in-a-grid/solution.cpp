class Solution {
  public:
    long long minCost(vector<int> &startPos, vector<int> &homePos, vector<int> &rowCosts, vector<int> &colCosts) {
        long long total = 0;
        int row = startPos[0];
        while (row != homePos[0]) {
            row += row < homePos[0] ? 1 : -1;
            total += rowCosts[row];
        }

        int col = startPos[1];
        while (col != homePos[1]) {
            col += col < homePos[1] ? 1 : -1;
            total += colCosts[col];
        }
        return total;
    }
};
