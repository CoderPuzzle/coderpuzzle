#include <unordered_map>
#include <vector>

class Solution {
  public:
    long long maxScore(vector<int> &prices) {
        // prices[indexes[j]] - prices[indexes[j - 1]] == indexes[j] -
        // indexes[j - 1] rearranges to prices[i] - i equal on consecutive
        // picks, so every linear selection lives inside one offset group and
        // any subset of one group is linear.  Every price is >= 1, so the
        // best subset of a group is the whole group; the answer is the
        // largest group total.  It is bounded by 10^5 * 10^9 = 10^14, which
        // is why it rides in a long long.
        unordered_map<int, long long> group_sum;
        long long best = 0;
        for (size_t day = 1; day <= prices.size(); ++day) {
            int offset = prices[day - 1] - static_cast<int>(day);
            long long total = group_sum[offset] + prices[day - 1];
            group_sum[offset] = total;
            best = max(best, total);
        }
        return best;
    }
};
