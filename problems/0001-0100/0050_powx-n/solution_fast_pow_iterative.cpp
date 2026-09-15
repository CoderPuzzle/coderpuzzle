class Solution {
  public:
    double myPow(double x, int n) {
        // Widen before negating: -(-2^31) = 2^31 overflows a 32-bit int.
        long long exp = n;
        if (exp < 0) {
            // By symmetry x^n = 1 / x^(-n).
            return 1.0 / power(x, -exp);
        }
        return power(x, exp);
    }

  private:
    double power(double base, long long exp) {
        // Exponentiation by squaring: x^n = (x^2)^(n/2) when n is even and
        // x * (x^2)^((n-1)/2) when odd, so halving the exponent every step
        // turns the linear chain into O(log n) multiplications. Walk exp's
        // bits from least to most significant.
        double result = 1.0;
        while (exp != 0) {
            // A set bit folds the current square into the result.
            if (exp & 1) {
                result *= base;
            }
            base *= base;
            exp >>= 1;
        }
        // result = product of x^(2^k) over exactly the set bits k of the
        // original exponent; exp == 0 skips the loop and yields 1.0.
        return result;
    }
};
