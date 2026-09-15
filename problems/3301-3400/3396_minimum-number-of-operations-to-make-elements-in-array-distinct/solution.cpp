class Solution {
  public:
    // Suffixes of a distinct array stay distinct, so the surviving tail is
    // nums[j:] for the smallest j whose suffix is duplicate-free. Scanning
    // right-to-left, that j is one past the first value that repeats inside
    // the tail; each operation removes 3 front elements.
    int minimumOperations(vector<int> &nums) {
        unordered_set<int> seen;
        int j = 0;
        for (int i = (int)nums.size() - 1; i >= 0; --i) {
            if (!seen.insert(nums[i]).second) {
                j = i + 1;
                break;
            }
        }
        return (j + 2) / 3;
    }
};
