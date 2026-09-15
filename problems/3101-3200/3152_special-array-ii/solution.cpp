class Solution {
  public:
    vector<bool> isArraySpecial(vector<int> &nums, vector<vector<int>> &queries) {
        int n = nums.size();
        vector<int> reach(n);
        for (int i = 1; i < n; i++) {
            reach[i] = (nums[i - 1] & 1) == (nums[i] & 1) ? i : reach[i - 1];
        }
        vector<bool> answer;
        answer.reserve(queries.size());
        for (auto &q : queries) {
            answer.push_back(reach[q[1]] <= q[0]);
        }
        return answer;
    }
};
