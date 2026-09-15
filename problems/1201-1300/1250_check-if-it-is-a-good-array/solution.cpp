class Solution {
  public:
    bool isGoodArray(vector<int> &nums) {
        // Bézout: the reachable sums are exactly the multiples of the gcd,
        // so a sum of 1 exists iff the overall gcd is 1.
        long long overall = 0;
        for (int value : nums) {
            overall = std::gcd(overall, (long long)value);
            if (overall == 1)
                return true;
        }
        return overall == 1;
    }
};
