class Solution {
  public:
    bool isGood(vector<int> &nums) {
        // A permutation of base[m] has maximum m and length m + 1, so the
        // maximum leaves exactly one candidate array to match. Sort a copy
        // of nums and compare it against the literally constructed
        // [1, ..., m - 1, m, m]. For m = 1 the ascending range is empty and
        // the expected array is just [1, 1], which is base[1] itself.
        int largest = 0;
        for (int value : nums) {
            largest = max(largest, value);
        }
        if ((int)nums.size() != largest + 1)
            // base[m] has length m + 1; a disagreement rules out every base.
            return false;
        vector<int> sortedNums(nums);
        sort(sortedNums.begin(), sortedNums.end());
        vector<int> expected;
        for (int value = 1; value < largest; ++value)
            expected.push_back(value);
        expected.push_back(largest);
        expected.push_back(largest);
        return sortedNums == expected;
    }
};
