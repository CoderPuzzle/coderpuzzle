class Solution {
  public:
    int largestUniqueNumber(vector<int> &nums) {
        vector<int> counts(1001, 0);
        for (int value : nums)
            counts[value]++;
        // Walk downward so the first singleton found is the largest.
        for (int value = 1000; value >= 0; --value) {
            if (counts[value] == 1)
                return value;
        }
        return -1;
    }
};
