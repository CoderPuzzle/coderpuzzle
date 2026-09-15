class Solution {
  public:
    // The condition rearranges to nums[i] - rev(nums[i]) being equal on
    // both sides, so each key pairs with every earlier equal key; the
    // running total stays under C(10^5, 2) ~ 5 * 10^9, so it is
    // accumulated in a long long and reduced once at the end.
    int countNicePairs(vector<int> &nums) {
        unordered_map<int, int> count;
        long long total = 0;
        for (int x : nums) {
            int y = x;
            int r = 0;
            while (y > 0) {
                r = r * 10 + y % 10;
                y /= 10;
            }
            int key = x - r;
            int &seen = count[key];
            total += seen;
            ++seen;
        }
        return total % 1000000007LL;
    }
};
