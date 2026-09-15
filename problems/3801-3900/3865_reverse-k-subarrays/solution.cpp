class Solution {
  public:
    vector<int> reverseSubarrays(vector<int> &nums, int k) {
        // Each block holds m = n / k elements. A two-pointer sweep swaps
        // the ends of a block inward, mirroring the "Two Pointers" tag, and
        // the blocks are visited left to right; the copy keeps the input
        // array untouched.
        int m = nums.size() / k;
        vector<int> result = nums;
        for (int start = 0; start < (int)nums.size(); start += m) {
            int i = start;
            int j = start + m - 1;
            while (i < j) {
                swap(result[i], result[j]);
                i++;
                j--;
            }
        }
        return result;
    }
};
