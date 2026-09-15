class Solution {
  public:
    int findGCD(vector<int> &nums) {
        int mn = nums[0];
        int mx = nums[0];
        for (int value : nums) {
            mn = min(mn, value);
            mx = max(mx, value);
        }
        while (mx != 0) {
            int t = mn % mx;
            mn = mx;
            mx = t;
        }
        return mn;
    }
};
