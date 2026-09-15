#include <algorithm>
#include <string>
#include <vector>

class Solution {
  public:
    // Gravity first: in each original row stones slide right until an
    // obstacle or the wall. Then a 90-degree clockwise rotation maps
    // new[r][c] to old[m - 1 - c][r].
    vector<vector<string>> rotateTheBox(vector<vector<string>> &boxGrid) {
        int m = boxGrid.size(), n = boxGrid[0].size();
        vector<vector<string>> rows = boxGrid;
        for (int r = 0; r < m; r++) {
            int write = n - 1;
            for (int c = n - 1; c >= 0; c--) {
                if (rows[r][c] == "*") {
                    write = c - 1;
                } else if (rows[r][c] == "#") {
                    swap(rows[r][c], rows[r][write]);
                    write--;
                }
            }
        }
        vector<vector<string>> out(n, vector<string>(m));
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < m; c++) {
                out[r][c] = rows[m - 1 - c][r];
            }
        }
        return out;
    }
};
