#include <algorithm>
#include <string>
#include <vector>

using namespace std;

class Solution {
  public:
    vector<int> smallestTrimmedNumbers(vector<string> &nums, vector<vector<int>> &queries) {
        // All strings share one length, so trimmed suffixes do too, and
        // lexicographic order on equal-length digit strings equals numeric
        // order — no numeric conversion needed (suffixes can exceed 64 bits).
        vector<int> answer;
        answer.reserve(queries.size());
        for (const vector<int> &query : queries) {
            int k = query[0];
            int trim = query[1];
            vector<int> order(nums.size());
            for (size_t i = 0; i < order.size(); ++i) {
                order[i] = static_cast<int>(i);
            }
            sort(order.begin(), order.end(), [&](int left, int right) {
                if (nums[left].compare(nums[left].size() - trim, string::npos, nums[right],
                                       nums[right].size() - trim) != 0) {
                    return nums[left].compare(nums[left].size() - trim, string::npos, nums[right],
                                              nums[right].size() - trim) < 0;
                }
                return left < right;
            });
            answer.push_back(order[k - 1]);
        }
        return answer;
    }
};
