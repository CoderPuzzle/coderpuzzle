class Solution {
  public:
    int sumFourDivisors(vector<int> &nums) {
        // Divisors pair up around the square root, so one scan to isqrt(n)
        // sees them all: each hit contributes d and n/d (collapsed to one
        // when d*d == n). Track count and sum together and add the sum only
        // for numbers landing on exactly four divisors.
        long long total = 0;
        for (int n : nums) {
            int count = 0;
            long long divisorSum = 0;
            for (int d = 1; (long long)d * d <= n; ++d) {
                if (n % d == 0) {
                    if ((long long)d * d == n) {
                        ++count;
                        divisorSum += d;
                    } else {
                        count += 2;
                        divisorSum += d + n / d;
                    }
                }
            }
            if (count == 4) {
                total += divisorSum;
            }
        }
        return static_cast<int>(total);
    }
};
