#include <algorithm>
#include <climits>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    int destroyTargets(vector<int> &nums, int space) {
        // Two targets are destroyed by one seed exactly when their values
        // share a residue modulo space (their difference is a multiple of
        // space), so group nums by nums[i] % space. The smallest value of
        // the largest group seeds the machine and wipes the whole group.
        unordered_map<int, int> counts;
        unordered_map<int, int> mins;
        for (int value : nums) {
            int r = value % space;
            counts[r]++;
            auto found = mins.find(r);
            if (found == mins.end() || value < found->second)
                mins[r] = value;
        }
        int best = 0;
        for (auto &entry : counts)
            best = max(best, entry.second);
        int answer = INT_MAX;
        for (auto &entry : counts)
            if (entry.second == best)
                answer = min(answer, mins[entry.first]);
        return answer;
    }
};
