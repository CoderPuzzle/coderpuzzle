class Solution {
  public:
    int minimumArrayLength(vector<int> &nums) {
        // A unique minimum absorbs everything (m % y == m for y > m), and a
        // value not divisible by the minimum forges an even smaller unique
        // minimum — both end at length 1. Otherwise every survivor stays a
        // multiple of m, and only merging two copies of m removes one.
        int m = *min_element(nums.begin(), nums.end());
        int count_m = static_cast<int>(count(nums.begin(), nums.end(), m));
        bool indivisible = any_of(nums.begin(), nums.end(), [&m](int value) { return value % m != 0; });
        if (count_m == 1 || indivisible)
            return 1;
        return (count_m + 1) / 2;
    }
};
