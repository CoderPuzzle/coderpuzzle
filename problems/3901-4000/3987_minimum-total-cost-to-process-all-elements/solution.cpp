class Solution {
  public:
    int minimumCost(vector<int> &nums, int k) {
        const long long M = 1000000007;
        long long s = 0;
        for (int x : nums)
            s += x;
        long long c = max(0LL, (s + k - 1) / k - 1), a = c, b = c + 1;
        if (a % 2 == 0)
            a /= 2;
        else
            b /= 2;
        return a % M * (b % M) % M;
    }
};
