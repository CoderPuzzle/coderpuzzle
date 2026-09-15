class Solution {
  public:
    int countGoodNumbers(long long n) {
        // Positions split by parity: (n+1)//2 even indices each hold one of
        // the 5 even digits, n//2 odd indices one of the 4 prime digits. The
        // product 5^e * 4^o is folded by iterative square-and-multiply, so n
        // up to 10^15 costs ~50 modular multiplications.
        const long long MOD = 1000000007LL;
        return (int)(power(5, (n + 1) / 2, MOD) * power(4, n / 2, MOD) % MOD);
    }

  private:
    long long power(long long base, long long exp, long long mod) {
        // Squares stay below (10^9+6)^2 ~ 10^18, safely inside long long.
        long long result = 1;
        long long b = base % mod;
        while (exp > 0) {
            if (exp & 1)
                result = result * b % mod;
            b = b * b % mod;
            exp >>= 1;
        }
        return result;
    }
};
