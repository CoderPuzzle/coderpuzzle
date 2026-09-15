class Solution {
  public:
    int divide(int dividend, int divisor) {
        // The one quotient that does not fit in 32 bits: -2^31 divided by -1 is 2^31.
        // Clamped up front per the statement's rule.
        if (dividend == INT_MIN && divisor == -1)
            return INT_MAX;
        // -2^31 has no positive int counterpart, so widen before magnitudes.
        long long a = dividend < 0 ? -(long long)dividend : dividend;
        long long b = divisor < 0 ? -(long long)divisor : divisor;
        // Magnitudes in, sign out: the quotient of the magnitudes with the
        // sign reapplied truncates toward zero by construction.
        bool negative = (dividend < 0) != (divisor < 0);
        long long quotient = 0;
        while (a >= b) {
            // Find the largest chunk = b doubled (by addition) that still
            // fits in a; multiple doubles alongside it as the chunk's weight.
            long long chunk = b;
            long long multiple = 1;
            while (a >= chunk + chunk) {
                chunk += chunk;
                multiple += multiple;
            }
            a -= chunk;
            quotient += multiple;
        }
        return negative ? (int)-quotient : (int)quotient;
    }
};
