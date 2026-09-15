#include <algorithm>
#include <string>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    std::vector<std::vector<std::string>> mostPopularCreator(std::vector<std::string> &creators,
                                                             std::vector<std::string> &ids, std::vector<int> &views) {
        // One pass keeps three running values per creator: total views,
        // best single-video view count, and the id achieving it
        // (lexicographically smallest on a tie). Totals reach
        // 10^5 * 10^5 = 10^10, so sums are long long.
        std::unordered_map<std::string, long long> totals;
        std::unordered_map<std::string, int> bestView;
        std::unordered_map<std::string, std::string> bestId;
        for (int i = 0; i < (int)creators.size(); ++i) {
            totals[creators[i]] += views[i];
            auto found = bestView.find(creators[i]);
            if (found == bestView.end() || views[i] > found->second ||
                (views[i] == found->second && ids[i] < bestId[creators[i]])) {
                bestView[creators[i]] = views[i];
                bestId[creators[i]] = ids[i];
            }
        }
        long long top = 0;
        for (auto &entry : totals)
            top = std::max(top, entry.second);
        std::vector<std::vector<std::string>> answer;
        for (auto &entry : totals)
            if (entry.second == top)
                answer.push_back({entry.first, bestId[entry.first]});
        std::sort(answer.begin(), answer.end());
        return answer;
    }
};
