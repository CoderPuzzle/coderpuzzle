#include <algorithm>
#include <functional>
#include <vector>

class Solution {
  public:
    int maxScore(vector<int> &nums) {
        // In descending order the first k elements are always the k largest
        // values, so every prefix sum is simultaneously maximal across all
        // rearrangements. Totals reach ±10^11, hence the long long
        // accumulator.
        std::sort(nums.begin(), nums.end(), std::greater<int>());
        long long total = 0;
        int score = 0;
        for (int value : nums) {
            total += value;
            if (total > 0)
                score++;
        }
        return score;
    }
};
