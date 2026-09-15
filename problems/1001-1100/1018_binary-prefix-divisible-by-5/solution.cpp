class Solution {
  public:
    vector<bool> prefixesDivBy5(vector<int> &nums) {
        vector<bool> answer(nums.size());
        int rem = 0;
        for (int i = 0; i < (int)nums.size(); i++) {
            rem = (rem * 2 + nums[i]) % 5;
            answer[i] = (rem == 0);
        }
        return answer;
    }
};
