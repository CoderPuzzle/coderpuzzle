class Solution {
  public:
    string smallestGoodBase(string n) {
        long long value = stoll(n);
        // An all-ones representation is a geometric sum 1 + k + ... + k^m.
        // Scan lengths longest-first: at a fixed total, more terms force
        // every term - the base included - to be smaller, so the first
        // length that admits an integer base already carries the smallest
        // one.
        for (int m = 60; m > 1; m--) {
            long long base = baseForLength(value, m);
            if (base != 0) {
                return to_string(base);
            }
        }
        // No representation of three 1s or longer fits; "11" in base
        // value - 1 always does.
        return to_string(value - 1);
    }

    long long baseForLength(long long value, int m) {
        // 1 + k + ... + k^m rises strictly with k, so grow a power-of-two
        // bound past the target, then bisect down to the smallest base
        // whose sum reaches value; that base is the hit when the sum
        // equals value exactly.
        long long hi = 2;
        while (sumCapped(hi, m, value) <= value) {
            hi *= 2;
        }
        long long lo = 2;
        while (lo < hi) {
            long long mid = (lo + hi) / 2;
            if (sumCapped(mid, m, value) < value) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return sumCapped(lo, m, value) == value ? lo : 0;
    }

    long long sumCapped(long long k, int m, long long value) {
        // The geometric sum, capped at "already past value": comparing the
        // term against value / k before multiplying is the overflow
        // guard - no stored number ever exceeds 2 * value <= 2 * 10^18,
        // which fits the 64-bit integers the fixed-width languages carry.
        long long total = 1;
        long long term = 1;
        for (int i = 0; i < m; i++) {
            if (term > value / k) {
                return value + 1;
            }
            term *= k;
            total += term;
            if (total > value) {
                return value + 1;
            }
        }
        return total;
    }
};
