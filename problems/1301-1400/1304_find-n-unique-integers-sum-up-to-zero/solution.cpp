class Solution {
  public:
    vector<int> sumZero(int n) {
        // Walk from -n/2 to n/2, skipping 0 for even n; every value pairs
        // with its negation so the array sums to zero with n distinct values.
        vector<int> result;
        int half = n / 2;
        for (int value = -half; value <= half; ++value) {
            if (value == 0 && n % 2 == 0) {
                continue;
            }
            result.push_back(value);
        }
        return result;
    }
};
