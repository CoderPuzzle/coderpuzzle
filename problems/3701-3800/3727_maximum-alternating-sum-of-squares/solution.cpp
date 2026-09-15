class Solution {
  public:
    long long maxAlternatingSum(vector<int> &nums) {
        // Squares erase signs, so sort the squared magnitudes and put the
        // largest ceil(n / 2) on the plus slots, the rest on minus slots.
        vector<long long> squares;
        squares.reserve(nums.size());
        for (int value : nums) {
            squares.push_back(static_cast<long long>(value) * value);
        }
        sort(squares.begin(), squares.end());
        const size_t minus = nums.size() / 2;
        long long score = 0;
        for (size_t index = 0; index < squares.size(); ++index) {
            score += index < minus ? -squares[index] : squares[index];
        }
        return score;
    }
};
