class Solution {
  public:
    long long maxSum(vector<int> &nums, int k, int mul) {
        sort(nums.rbegin(), nums.rend());
        long long answer = 0;
        int take = min(k, max(0, mul - 1));
        for (int i = 0; i < k; ++i)
            answer += 1LL * nums[i] * (i < take ? mul - i : 1);
        return answer;
    }
};
