class Solution {
  public:
    vector<int> orArray(vector<int> &nums) {
        vector<int> answer;
        answer.reserve(nums.size() - 1);
        for (int i = 0; i < (int)nums.size() - 1; ++i) {
            answer.push_back(nums[i] | nums[i + 1]);
        }
        return answer;
    }
};
