class Solution {
  public:
    double soupServings(int n) {
        // Round up to whole servings of 25 mL each.
        int m = (n + 24) / 25;
        if (m >= 179) {
            return 1.0;
        }

        vector<vector<double>> table(m + 1, vector<double>(m + 1, 0.0));
        auto value = [&](int a, int b) -> double {
            if (a <= 0 && b <= 0) {
                return 0.5;
            }
            if (a <= 0) {
                return 1.0;
            }
            if (b <= 0) {
                return 0.0;
            }
            return table[a][b];
        };

        for (int a = 1; a <= m; a++) {
            for (int b = 1; b <= m; b++) {
                table[a][b] =
                    0.25 * (value(a - 4, b) + value(a - 3, b - 1) + value(a - 2, b - 2) + value(a - 1, b - 3));
            }
        }
        return value(m, m);
    }
};
