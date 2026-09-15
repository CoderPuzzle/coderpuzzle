#include <queue>
#include <utility>
#include <vector>

class Solution {
  public:
    long long maxSum(vector<int> &nums, vector<int> &threshold) {
        // An element unlocks when step reaches its threshold and stays
        // usable forever after. Bucket indices by unlock step; everything
        // at threshold 1 starts in the max-heap of usable values.
        int n = nums.size();
        vector<vector<int>> waiting(n + 1);
        // The comparator reports "lower priority", so pairs of
        // (-value, index) pop largest value first.
        priority_queue<pair<int, int>> live;
        for (int i = 0; i < n; ++i) {
            if (threshold[i] <= 1) {
                live.push({-nums[i], i});
            } else {
                waiting[threshold[i]].push_back(i);
            }
        }
        long long total = 0;
        int step = 1;
        while (true) {
            // Fold in this step's unlocks, then stop if nothing is usable.
            if (step <= n) {
                for (int i : waiting[step]) {
                    live.push({-nums[i], i});
                }
            }
            if (live.empty())
                break;
            total += -live.top().first;
            live.pop();
            ++step;
        }
        return total;
    }
};
