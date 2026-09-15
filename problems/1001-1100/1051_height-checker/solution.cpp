class Solution {
  public:
    int heightChecker(vector<int> &heights) {
        // The expected order is just heights sorted into non-decreasing
        // order. Compare position-by-position and count every mismatch.
        vector<int> expected(heights);
        sort(expected.begin(), expected.end());
        int count = 0;
        for (size_t i = 0; i < heights.size(); ++i) {
            if (heights[i] != expected[i]) {
                ++count;
            }
        }
        return count;
    }
};
