class Solution {

    public double myPow(double x, int n) {
        // Widen before negating: -(-2^31) = 2^31 overflows a 32-bit int.
        long exp = n;
        if (exp < 0) {
            // By symmetry x^n = 1 / x^(-n).
            return 1.0 / power(x, -exp);
        }
        return power(x, exp);
    }

    private double power(double base, long exp) {
        // Exponentiation by halving: compute the square of the half-size
        // subproblem once, then use it once (even exp) or twice (odd) —
        // x^n = (x^(n/2))^2, times x when exp is odd.
        if (exp == 0) {
            // Base case: any nonzero base to the zero is 1.0.
            return 1.0;
        }
        double half = power(base, exp / 2);
        if (exp % 2 == 0) {
            return half * half;
        }
        // One leftover factor of x for the odd exponent.
        return half * half * base;
    }
}
