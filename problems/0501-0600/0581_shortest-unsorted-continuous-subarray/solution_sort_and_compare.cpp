class Solution {
  public:
    int findUnsortedSubarray(vector<int> &nums) {
        // Sort a copy and compare position by position: everything outside
        // the reorder window already sits where the sorted order puts it,
        // so the FIRST and LAST disagreeing positions are the window's edges.
        int n = nums.size();
        vector<int> sorted = nums;
        sort(sorted.begin(), sorted.end());
        int start = 0;
        while (start < n && nums[start] == sorted[start])
            start++;
        if (start == n)
            return 0;
        int end = n - 1;
        while (nums[end] == sorted[end])
            end--;
        return end - start + 1;
    }
};
