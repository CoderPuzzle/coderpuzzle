class Solution {
  public:
    long long maxScore(vector<int> &nums, int x) {
        const long long unseen = -(1LL << 60);
        long long best[2] = {unseen, unseen};
        best[nums[0] % 2] = nums[0];

        for (int index = 1; index < static_cast<int>(nums.size()); ++index) {
            int parity = nums[index] % 2;
            long long extended = best[parity] + nums[index];
            long long switched = best[parity ^ 1] + nums[index] - x;
            best[parity] = max(extended, switched);
        }
        return max(best[0], best[1]);
    }
};
