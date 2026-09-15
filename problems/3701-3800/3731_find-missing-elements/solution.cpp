class Solution {
  public:
    vector<int> findMissingElements(vector<int> &nums) {
        // Mark presence per value, then sweep the original range [min, max]
        // in increasing order: every unmarked value is missing, and sweeping
        // in order yields the sorted result directly.
        int lo = *min_element(nums.begin(), nums.end());
        int hi = *max_element(nums.begin(), nums.end());
        vector<char> present(hi + 1, 0);
        for (int value : nums) {
            present[value] = 1;
        }
        vector<int> missing;
        for (int value = lo; value <= hi; ++value) {
            if (!present[value]) {
                missing.push_back(value);
            }
        }
        return missing;
    }
};
