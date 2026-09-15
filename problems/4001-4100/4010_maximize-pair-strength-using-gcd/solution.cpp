class Solution {
  public:
    long long maxPairStrength(vector<int> &nums) {
        // Fewer than two million pairs at n <= 2000, so every distinct
        // index pair is tried directly: g = gcd(a, b), strength =
        // a * b / g^2. The division is exact because g divides both
        // factors, and equal values collapse to 1, which is why [3,3]
        // scores 1. Widen to 64 bits before multiplying: two coprime
        // values near the bound reach just under 1e10, past what an
        // int can hold.
        long long best = 0;
        for (int i = 0; i < (int)nums.size(); i++) {
            for (int j = i + 1; j < (int)nums.size(); j++) {
                long long g = gcd(nums[i], nums[j]);
                long long s = 1LL * nums[i] * nums[j] / (g * g);
                if (s > best) {
                    best = s;
                }
            }
        }
        return best;
    }

  private:
    long long gcd(long long a, long long b) {
        while (b != 0) {
            long long t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
};
