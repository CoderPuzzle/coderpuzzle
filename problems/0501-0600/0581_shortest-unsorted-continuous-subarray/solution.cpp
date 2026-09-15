class Solution {
  public:
    int findUnsortedSubarray(vector<int> &nums) {
        // Scan left to right carrying the running max: an element below the
        // running max is out of place, and the LAST such index is the
        // window's right edge; a right-to-left pass with the running min
        // finds the left edge. Strict < and > keep equal values out.
        int n = nums.size();
        int start = -1, end = -1;
        int runningMax = numeric_limits<int>::min();
        for (int i = 0; i < n; ++i) {
            if (nums[i] < runningMax)
                end = i;
            else
                runningMax = nums[i];
        }
        int runningMin = numeric_limits<int>::max();
        for (int i = n - 1; i >= 0; --i) {
            if (nums[i] > runningMin)
                start = i;
            else
                runningMin = nums[i];
        }
        return end == -1 ? 0 : end - start + 1;
    }
};
