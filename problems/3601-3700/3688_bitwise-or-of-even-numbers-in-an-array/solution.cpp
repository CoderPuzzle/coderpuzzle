class Solution {
  public:
    int evenNumberBitwiseORs(vector<int> &nums) {
        // Fold each even value into the accumulator as the scan passes it;
        // 0 is the OR identity, so an array with no evens returns 0.
        int result = 0;
        for (int value : nums) {
            if (value % 2 == 0) {
                result |= value;
            }
        }
        return result;
    }
};
