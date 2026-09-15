class Solution {
  public:
    vector<int> sortByAbsoluteValue(vector<int> &nums) {
        // Comparator (|a|, a): magnitude orders the array, and the signed
        // value breaks every magnitude tie so -x always lands before x.
        sort(nums.begin(), nums.end(), [](int a, int b) {
            if (abs(a) != abs(b)) {
                return abs(a) < abs(b);
            }
            return a < b;
        });
        // The tie-break makes the ordering total on distinct outcomes, so
        // the result is unique regardless of the sort's stability.
        return nums;
    }
};
