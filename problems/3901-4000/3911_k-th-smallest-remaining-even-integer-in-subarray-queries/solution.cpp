#include <algorithm>
#include <vector>

class Solution {
  public:
    vector<int> kthRemainingInteger(vector<int> &nums, vector<vector<int>> &queries) {
        vector<int> positions;
        vector<int> adjusted;
        for (int index = 0; index < (int)nums.size(); ++index) {
            if (nums[index] % 2 == 0) {
                positions.push_back(index);
                adjusted.push_back(nums[index] / 2 - ((int)positions.size() - 1));
            }
        }

        vector<int> result;
        result.reserve(queries.size());
        for (const vector<int> &query : queries) {
            int first = (int)(lower_bound(positions.begin(), positions.end(), query[0]) - positions.begin());
            int last = (int)(upper_bound(positions.begin(), positions.end(), query[1]) - positions.begin());
            int crossed = (int)(upper_bound(adjusted.begin() + first, adjusted.begin() + last, query[2] - first) -
                                (adjusted.begin() + first));
            result.push_back(2 * (query[2] + crossed));
        }
        return result;
    }
};
