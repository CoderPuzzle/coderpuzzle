#include <algorithm>
#include <unordered_map>
#include <utility>
#include <vector>

class Solution {
  public:
    int largestOverlap(vector<vector<int>> &img1, vector<vector<int>> &img2) {
        // A translation slides every 1 of one image by one shared vector, so
        // a 1 at (i1, j1) in img1 sits on a 1 at (i2, j2) in img2 exactly
        // under the shift that carries (i2, j2) onto (i1, j1) — the delta
        // between the two cells. Counting over all pairs of 1-cells how often
        // each delta occurs scores every shift at once, and the largest count
        // is the largest overlap. Delta components lie in [-29, 29], so the
        // packed key dr*100 + dc is injective.
        int n = (int)img1.size();
        vector<pair<int, int>> ones1, ones2;
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                if (img1[i][j] == 1)
                    ones1.emplace_back(i, j);
                if (img2[i][j] == 1)
                    ones2.emplace_back(i, j);
            }
        }
        unordered_map<int, int> counts;
        int best = 0;
        for (auto [i1, j1] : ones1) {
            for (auto [i2, j2] : ones2) {
                int delta = (i1 - i2) * 100 + (j1 - j2);
                best = max(best, ++counts[delta]);
            }
        }
        return best;
    }
};
