class Solution {
  public:
    vector<int> moveZeroes(vector<int> &nums) {
        // Invariant: nums[0..slow) is the stabilized prefix of non-zero
        // values in their original order; nums[slow..fast] holds only zeros.
        int slow = 0;
        for (int fast = 0; fast < (int)nums.size(); fast++) {
            if (nums[fast] != 0) {
                // Swap the non-zero into its slot. While slow == fast (no
                // zeros seen yet) this is a self-exchange, so each element
                // moves at most once.
                swap(nums[slow], nums[fast]);
                slow++;
            }
        }
        return nums;
    }
};
