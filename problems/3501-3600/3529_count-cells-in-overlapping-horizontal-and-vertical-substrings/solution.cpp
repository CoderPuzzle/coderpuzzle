class Solution {
  public:
    int countCells(vector<vector<string>> &grid, string pattern) {
        int m = grid.size(), n = grid[0].size();
        int total = m * n, length = pattern.size();

        // KMP failure function over the pattern.
        vector<int> fail(length, 0);
        for (int i = 1, k = 0; i < length; i++) {
            while (k && pattern[i] != pattern[k])
                k = fail[k - 1];
            if (pattern[i] == pattern[k])
                k++;
            fail[i] = k;
        }
        auto starts = [&](const string &text) {
            vector<int> found;
            for (int i = 0, k = 0; i < (int)text.size(); i++) {
                while (k && text[i] != pattern[k])
                    k = fail[k - 1];
                if (text[i] == pattern[k])
                    k++;
                if (k == length) {
                    found.push_back(i - length + 1);
                    k = fail[k - 1];
                }
            }
            return found;
        };

        // Horizontal reads = row-major flatten; vertical reads = column-major.
        string horizontal, vertical;
        horizontal.reserve(total);
        vertical.reserve(total);
        for (const auto &row : grid)
            for (const auto &cell : row)
                horizontal += cell;
        for (int c = 0; c < n; c++)
            for (int r = 0; r < m; r++)
                vertical += grid[r][c];

        // Difference arrays over the two flatten orders; a match covers
        // positions start .. start + length - 1 in its own flatten order.
        vector<int> hmark(total + 1, 0), vmark(total + 1, 0);
        for (int start : starts(horizontal)) {
            hmark[start]++;
            hmark[start + length]--;
        }
        for (int start : starts(vertical)) {
            vmark[start]++;
            vmark[start + length]--;
        }
        for (int i = 0; i < total; i++) {
            hmark[i + 1] += hmark[i];
            vmark[i + 1] += vmark[i];
        }

        // A cell (r, c) sits at row-major position r*n+c and column-major
        // position c*m+r; it counts iff both marks cover it.
        int covered = 0;
        for (int r = 0; r < m; r++)
            for (int c = 0; c < n; c++)
                if (hmark[r * n + c] > 0 && vmark[c * m + r] > 0)
                    covered++;
        return covered;
    }
};
