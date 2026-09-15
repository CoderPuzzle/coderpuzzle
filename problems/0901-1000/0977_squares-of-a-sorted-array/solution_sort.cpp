class Solution {
  public:
    vector<int> sortedSquares(vector<int> &nums) {
        // The direct reading the follow-up names: square every element in
        // place, then let the language's sort produce the order. The input's
        // own arrangement is never consulted — squaring kills the sign, so
        // negatives need no case of their own.
        int size = nums.size();
        vector<int> squares(size);
        for (int i = 0; i < size; i++) {
            squares[i] = nums[i] * nums[i];
        }
        sort(squares.begin(), squares.end());
        return squares;
    }
};
