#include <algorithm>
#include <deque>
#include <string>
#include <unordered_map>
#include <vector>

class Solution {
    int longestWithDelta(const std::string &s, int target, int cap) {
        std::vector<int> prefix(s.size() + 1, 0);
        std::unordered_map<int, std::deque<int>> positions;
        positions[0].push_back(0);
        int best = 0;
        for (int right = 1; right <= (int)s.size(); ++right) {
            prefix[right] = prefix[right - 1] + (s[right - 1] == '1' ? 1 : -1);
            int expired = right - cap - 1;
            if (expired >= 0) {
                auto &queue = positions[prefix[expired]];
                if (!queue.empty() && queue.front() == expired) {
                    queue.pop_front();
                }
            }
            auto found = positions.find(prefix[right] - target);
            if (found != positions.end() && !found->second.empty()) {
                best = std::max(best, right - found->second.front());
            }
            positions[prefix[right]].push_back(right);
        }
        return best;
    }

  public:
    int longestBalanced(std::string s) {
        int zeros = std::count(s.begin(), s.end(), '0');
        int ones = s.size() - zeros;
        return std::max(
            {longestWithDelta(s, 0, s.size()), longestWithDelta(s, 2, 2 * zeros), longestWithDelta(s, -2, 2 * ones)});
    }
};
