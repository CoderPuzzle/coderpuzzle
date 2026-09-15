class Solution {
  public:
    vector<vector<int>> resultGrid(vector<vector<int>> &image, int threshold) {
        int m = image.size(), n = image[0].size();
        if (m < 3 || n < 3)
            return image;
        // Fold the twelve adjacent-pair tests once: calm_h[r][c] says row r is
        // horizontally calm across columns c..c+2, calm_v[r][c] says column c
        // is vertically calm across rows r..r+2.
        vector<vector<bool>> calm_h(m, vector<bool>(n - 2, false));
        vector<vector<bool>> calm_v(m - 2, vector<bool>(n, false));
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c + 2 < n; ++c) {
                bool left = abs(image[r][c] - image[r][c + 1]) <= threshold;
                bool right = abs(image[r][c + 1] - image[r][c + 2]) <= threshold;
                calm_h[r][c] = left && right;
            }
        }
        for (int c = 0; c < n; ++c) {
            for (int r = 0; r + 2 < m; ++r) {
                bool top = abs(image[r][c] - image[r + 1][c]) <= threshold;
                bool bot = abs(image[r + 1][c] - image[r + 2][c]) <= threshold;
                calm_v[r][c] = top && bot;
            }
        }
        // Prefix sums give each window's nine-cell total in constant time.
        vector<vector<int>> pref(m + 1, vector<int>(n + 1, 0));
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                pref[r + 1][c + 1] = pref[r][c + 1] + pref[r + 1][c] - pref[r][c] + image[r][c];
            }
        }
        vector<vector<int>> sum(m, vector<int>(n, 0)), count(m, vector<int>(n, 0));
        for (int i = 0; i + 2 < m; ++i) {
            for (int j = 0; j + 2 < n; ++j) {
                if (!calm_h[i][j] || !calm_h[i + 1][j] || !calm_h[i + 2][j])
                    continue;
                if (!calm_v[i][j] || !calm_v[i][j + 1] || !calm_v[i][j + 2])
                    continue;
                int avg = (pref[i + 3][j + 3] - pref[i][j + 3] - pref[i + 3][j] + pref[i][j]) / 9;
                for (int r = i; r < i + 3; ++r) {
                    for (int c = j; c < j + 3; ++c) {
                        sum[r][c] += avg;
                        ++count[r][c];
                    }
                }
            }
        }
        vector<vector<int>> result(m, vector<int>(n));
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                result[r][c] = count[r][c] ? sum[r][c] / count[r][c] : image[r][c];
            }
        }
        return result;
    }
};
