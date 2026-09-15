class Solution {
  public:
    int missingNumber(vector<int> &nums) {
        // Seed with n — the one index the loop below never visits — then
        // fold every index 0..n-1 and every element into one accumulator.
        int result = nums.size();
        for (int i = 0; i < (int)nums.size(); ++i) {
            // Each present value matches an index and cancels it; the absent
            // value pairs with nothing and survives the fold.
            result ^= i ^ nums[i];
        }
        return result;
    }
};
