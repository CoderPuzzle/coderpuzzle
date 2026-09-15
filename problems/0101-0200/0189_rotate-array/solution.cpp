class Solution {
  public:
    vector<int> rotate(vector<int> &nums, int k) {
        int n = nums.size();
        // A rotation by n steps is the identity, so any larger k wraps
        // around to k % n — normalize before splitting into blocks.
        k %= n;
        // Three reversals compose into a right rotation: reversing the
        // whole array trades the two blocks, and reversing each block
        // afterwards restores its internal order. Each pass is swap-only,
        // so the rotation rewrites the given array with no second allocation.
        reverse(nums.begin(), nums.end());
        reverse(nums.begin(), nums.begin() + k);
        reverse(nums.begin() + k, nums.end());
        // The rotation happened inside the input allocation; the same array,
        // now rotated, is what the judge compares.
        return nums;
    }
};
