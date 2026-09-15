class Solution {
  public:
    vector<int> answerQueries(vector<int> &nums, vector<int> &queries) {
        // The longest subsequence under a sum cap uses the smallest
        // elements: sort, prefix-sum, then count prefixes <= query by
        // binary search (first index whose prefix exceeds the query).
        sort(nums.begin(), nums.end());
        for (int i = 1; i < (int)nums.size(); ++i) {
            nums[i] += nums[i - 1];
        }
        vector<int> answer;
        answer.reserve(queries.size());
        for (int q : queries) {
            answer.push_back(upper_bound(nums.begin(), nums.end(), q) - nums.begin());
        }
        return answer;
    }
};
