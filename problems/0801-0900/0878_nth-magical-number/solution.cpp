class Solution {
  public:
    int nthMagicalNumber(int n, int a, int b) {
        // Divisible by a or b, so inclusion-exclusion counts the magical
        // numbers up to x as x/a + x/b - x/lcm(a, b) — the overlap holds
        // exactly the multiples of the least common multiple. That count
        // never decreases and rises by one exactly on magical numbers, so
        // the nth magical number is the smallest x whose count reaches n.
        // Binary search over [1, n*min(a, b)] finds it — the top is the
        // nth multiple of the smaller value, itself magical, so it is a
        // valid ceiling. At the bound n = 1e9 with a = b = 4e4 the answer
        // reaches 4e13, so the search runs in long long; only the value
        // reduced below 1e9 + 7 is narrowed.
        long long g = a, y = b;
        while (y != 0) {
            long long t = g % y;
            g = y;
            y = t;
        }
        long long lcm = a / g * b;
        long long lo = 1, hi = (long long)n * std::min(a, b);
        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            if (mid / a + mid / b - mid / lcm >= n) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return (int)(lo % 1'000'000'007LL);
    }
};
