class Solution {
  public:
    vector<int> closestDivisors(int num) {
        // The closest pair for a product m has its smaller factor as large
        // as possible: the first divisor found walking down from isqrt(m).
        auto closest = [](long long m) {
            long long d = (long long)sqrt((double)m);
            while (d * d > m) {
                --d;
            }
            while ((d + 1) * (d + 1) <= m && m % (d + 1) == 0) {
                ++d;
            }
            while (m % d != 0) {
                --d;
            }
            return vector<int>{(int)d, (int)(m / d)};
        };
        vector<int> a = closest((long long)num + 1);
        vector<int> b = closest((long long)num + 2);
        return a[1] - a[0] <= b[1] - b[0] ? a : b;
    }
};
