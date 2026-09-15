#include <algorithm>
#include <vector>

using namespace std;

class Solution {
  public:
    int longestSubsequence(vector<int> &nums) {
        // Values fit below 2^30 (nums[i] <= 10^9) and the answer is at most
        // nums.size() <= 10^5, so int arithmetic carries everything here.
        // A subsequence ANDs to something non-zero exactly when all of its
        // elements share at least one set bit, so for each bit keep the
        // elements that have it (order preserved) and take the longest
        // strictly increasing subsequence among them; the best bit wins.
        int top = 0;
        for (int x : nums) {
            top = max(top, x);
        }
        int best = 0;
        for (int b = 0; top >> b > 0; b++) {
            vector<int> tails;
            for (int x : nums) {
                if (!(x >> b & 1)) {
                    continue;
                }
                // Strictly increasing: replace the first tail >= x.
                auto it = lower_bound(tails.begin(), tails.end(), x);
                if (it == tails.end()) {
                    tails.push_back(x);
                } else {
                    *it = x;
                }
            }
            best = max(best, int(tails.size()));
        }
        return best;
    }
};
