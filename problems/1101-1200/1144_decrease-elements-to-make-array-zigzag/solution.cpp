class Solution {
  public:
    int movesToMakeZigzag(vector<int> &nums) {
        auto cost = [&](int valley_parity) {
            int moves = 0;
            for (int i = valley_parity; i < (int)nums.size(); i += 2) {
                // Valley must drop below both neighbors; the neighbors are
                // peaks of the other parity and never get decreased.
                int bound = INT_MAX;
                if (i > 0)
                    bound = min(bound, nums[i - 1]);
                if (i + 1 < (int)nums.size())
                    bound = min(bound, nums[i + 1]);
                if (nums[i] >= bound)
                    moves += nums[i] - bound + 1;
            }
            return moves;
        };
        return min(cost(0), cost(1));
    }
};
