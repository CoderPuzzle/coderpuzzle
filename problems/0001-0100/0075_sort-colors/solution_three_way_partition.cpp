class Solution {
  public:
    vector<int> sortColors(vector<int> &nums) {
        // Three growing regions and an unexplored tail:
        //   [0, low)    settled 0s
        //   [low, mid)  settled 1s
        //   [mid, high] unexamined
        //   (high, end) settled 2s
        // Each step examines nums[mid] and shrinks the unexamined band.
        int low = 0, mid = 0, high = (int)nums.size() - 1;
        while (mid <= high) {
            int value = nums[mid];
            if (value == 0) {
                // The element swapped in from `low` is a settled 1 (or mid
                // == low, swapping with itself), so mid may advance too.
                swap(nums[low], nums[mid]);
                low++;
                mid++;
            } else if (value == 1) {
                // Already in its home region: the unexamined band alone
                // shrinks.
                mid++;
            } else {
                // The element swapped in from `high` is unexamined, so mid
                // stays put and re-reads it on the next pass.
                swap(nums[mid], nums[high]);
                high--;
            }
        }
        return nums;
    }
};
