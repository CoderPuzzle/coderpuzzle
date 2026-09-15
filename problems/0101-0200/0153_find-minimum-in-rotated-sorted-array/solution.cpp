class Solution {
  public:
    int findMin(vector<int> &nums) {
        int lo = 0;
        int hi = static_cast<int>(nums.size()) - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            // Compare against the right end: a live window endpoint whose
            // verdict stays correct even when the array was not rotated.
            if (nums[mid] > nums[hi]) {
                // The drop (start of the second ascending run) is right of mid.
                lo = mid + 1;
            } else {
                // mid..hi is non-decreasing: the minimum is at mid or left.
                hi = mid;
            }
        }
        // lo and hi meet on the single survivor.
        return nums[lo];
    }
};
