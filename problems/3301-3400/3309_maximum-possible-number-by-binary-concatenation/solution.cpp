class Solution {
  public:
    int maxGoodNumber(vector<int> &nums) {
        // Only 3! = 6 orders exist, so try each one exhaustively. Combining
        // is arithmetic: shift the accumulator left by the number's bit
        // width and OR the number into the freed bits. Three 7-bit values
        // concatenate to at most 21 bits, well inside int.
        int best = 0;
        int orders[6][3] = {
            {nums[0], nums[1], nums[2]}, {nums[0], nums[2], nums[1]}, {nums[1], nums[0], nums[2]},
            {nums[1], nums[2], nums[0]}, {nums[2], nums[0], nums[1]}, {nums[2], nums[1], nums[0]},
        };
        for (auto &order : orders) {
            int value = 0;
            for (int x : order) {
                int width = 0;
                while (x >> width) {
                    ++width;
                }
                value = (value << width) | x;
            }
            best = max(best, value);
        }
        return best;
    }
};
