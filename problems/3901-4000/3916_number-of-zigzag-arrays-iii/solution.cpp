#include <vector>

class Solution {
  public:
    int zigZagArrays(int n, int l, int r) {
        const long long mod = 1000000007;
        int points = n + 1;
        vector<long long> values(points + 1, 0);
        for (int width = 2; width <= points; ++width) {
            vector<long long> up(width), down(width);
            for (int value = 0; value < width; ++value) {
                up[value] = value;
                down[value] = width - 1 - value;
            }
            for (int length = 3; length <= n; ++length) {
                vector<long long> nextUp(width), nextDown(width);
                long long running = 0;
                for (int value = 0; value < width; ++value) {
                    nextUp[value] = running;
                    running = (running + down[value]) % mod;
                }
                running = 0;
                for (int value = width - 1; value >= 0; --value) {
                    nextDown[value] = running;
                    running = (running + up[value]) % mod;
                }
                up.swap(nextUp);
                down.swap(nextDown);
            }
            for (int value = 0; value < width; ++value)
                values[width] = (values[width] + up[value] + down[value]) % mod;
        }
        int width = r - l + 1;
        if (width <= points)
            return (int)values[width];
        vector<long long> factorial(points + 1, 1), inverseFactorial(points + 1, 1);
        for (int value = 1; value <= points; ++value)
            factorial[value] = factorial[value - 1] * value % mod;
        inverseFactorial[points] = power(factorial[points], mod - 2, mod);
        for (int value = points; value > 0; --value)
            inverseFactorial[value - 1] = inverseFactorial[value] * value % mod;
        vector<long long> prefix(points + 2, 1), suffix(points + 2, 1);
        for (int value = 1; value <= points; ++value)
            prefix[value] = prefix[value - 1] * (width - value) % mod;
        for (int value = points; value > 0; --value)
            suffix[value] = suffix[value + 1] * (width - value) % mod;
        long long answer = 0;
        for (int value = 1; value <= points; ++value) {
            long long term = values[value] * prefix[value - 1] % mod * suffix[value + 1] % mod;
            term = term * inverseFactorial[value - 1] % mod * inverseFactorial[points - value] % mod;
            answer += (points - value) % 2 == 0 ? term : -term;
        }
        return (int)((answer % mod + mod) % mod);
    }

  private:
    long long power(long long base, long long exponent, long long mod) {
        long long result = 1;
        while (exponent > 0) {
            if (exponent & 1)
                result = result * base % mod;
            base = base * base % mod;
            exponent >>= 1;
        }
        return result;
    }
};
