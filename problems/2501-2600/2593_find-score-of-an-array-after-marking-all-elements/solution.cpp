#include <algorithm>
#include <vector>

class Solution {
  public:
    long long findScore(std::vector<int> &nums) {
        // Visit candidates in (value, index) order once; the first
        // not-yet-marked visit of each position is exactly the statement's
        // "smallest unmarked, smallest index" pick, and its neighborhood is
        // marked on the spot, so later sorted candidates skip it naturally.
        // Chosen indices are pairwise non-adjacent, so at most ceil(n / 2)
        // values of up to 10^6 are summed — under 5 * 10^10, which is why
        // the score rides in a long long.
        int n = nums.size();
        std::vector<int> order(n);
        for (int i = 0; i < n; ++i) {
            order[i] = i;
        }
        std::sort(order.begin(), order.end(), [&](int a, int b) {
            if (nums[a] != nums[b])
                return nums[a] < nums[b];
            return a < b;
        });
        std::vector<char> marked(n, 0);
        long long score = 0;
        for (int i : order) {
            if (marked[i]) {
                continue;
            }
            score += nums[i];
            marked[i] = 1;
            if (i > 0) {
                marked[i - 1] = 1;
            }
            if (i + 1 < n) {
                marked[i + 1] = 1;
            }
        }
        return score;
    }
};
