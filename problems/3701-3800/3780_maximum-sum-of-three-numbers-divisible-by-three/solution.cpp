#include <algorithm>
#include <vector>

class Solution {
  public:
    int maximumSum(vector<int> &nums) {
        // Group values by remainder mod 3 and keep the three largest of
        // each group -- no valid triplet ever needs a group's fourth-
        // largest value. The only remainder patterns summing to 0 mod 3
        // are 000, 111, 222, and 012, so at most nine values decide
        // everything; the answer is at most 3 * 10^5, safely inside 32
        // bits. If no pattern is achievable the answer stays 0.
        vector<vector<int>> top(3);
        for (int v : nums) {
            top[v % 3].push_back(v);
        }
        for (vector<int> &group : top) {
            sort(group.begin(), group.end(), greater<int>());
            if (group.size() > 3) {
                group.resize(3);
            }
        }
        auto take = [&](int r, int k) {
            const vector<int> &group = top[r];
            if ((int)group.size() < k) {
                return -1;
            }
            int total = 0;
            for (int i = 0; i < k; i++) {
                total += group[i];
            }
            return total;
        };
        int best = 0;
        for (int r = 0; r < 3; r++) {
            int total = take(r, 3);
            if (total > best) {
                best = total;
            }
        }
        int a = take(0, 1), b = take(1, 1), c = take(2, 1);
        if (a >= 0 && b >= 0 && c >= 0 && a + b + c > best) {
            best = a + b + c;
        }
        return best;
    }
};
