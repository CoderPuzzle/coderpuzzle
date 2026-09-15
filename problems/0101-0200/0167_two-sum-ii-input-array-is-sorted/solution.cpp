class Solution {
  public:
    vector<int> twoSum(vector<int> &numbers, int target) {
        int left = 0, right = (int)numbers.size() - 1;
        while (left < right) {
            int total = numbers[left] + numbers[right];
            if (total == target)
                // 1-based indices as the problem expects.
                return {left + 1, right + 1};
            if (total < target)
                // Too small: pairing numbers[left] with anything smaller than
                // numbers[right] only lowers the sum — retire the left value.
                ++left;
            else
                // Too large: retire the right value symmetrically.
                --right;
        }
        // Unreachable under the uniqueness promise; keeps the function total.
        return {};
    }
};
