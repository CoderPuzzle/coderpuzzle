class Solution {
  public:
    // Elements are at most 10, so any lcm divides 2520 and any gcd is
    // at most 10: once the running product passes 25200 it can never
    // equal lcm * gcd again, so the inner walk can stop early.
    int maxLength(vector<int> &nums) {
        int n = nums.size(), ans = 0;
        for (int left = 0; left < n; left++) {
            int prod = 1, g = 0, m = 1;
            for (int right = left; right < n; right++) {
                int x = nums[right];
                prod *= x;
                g = gcd(g, x);
                m = m * x / gcd(m, x);
                if (prod == m * g) {
                    ans = max(ans, right - left + 1);
                } else if (prod > 25200) {
                    break;
                }
            }
        }
        return ans;
    }
};
