class Solution {
  public:
    int maxFont(string text, int w, int h, vector<int> &fonts, vector<vector<int>> &widths, vector<int> &heights) {
        // Fit is monotonic in the font index (widths/heights only grow), so
        // binary search the boundary between fitting and not fitting.
        auto fits = [&](int index) {
            if (heights[index] > h) {
                return false;
            }
            const vector<int> &row = widths[index];
            long long total = 0;
            for (char ch : text) {
                total += row[ch - 'a'];
                if (total > w) {
                    return false;
                }
            }
            return true;
        };

        int lo = 0;
        int hi = static_cast<int>(fonts.size()) - 1;
        int answer = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (fits(mid)) {
                answer = fonts[mid];
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return answer;
    }
};
