class Solution {
  public:
    string fractionToDecimal(int numerator, int denominator) {
        // -2^31 has no positive int counterpart, so widen before magnitudes;
        // every later intermediate is a remainder below 2^31 times 10.
        long long n = numerator < 0 ? -(long long)numerator : numerator;
        long long d = denominator < 0 ? -(long long)denominator : denominator;
        // Magnitudes in, sign out: "-" is prepended once, and never on a zero
        // result (0 over a negative denominator must not become "-0").
        string result = (numerator < 0) != (denominator < 0) && n != 0 ? "-" : "";
        result += to_string(n / d);
        long long remainder = n % d;
        if (remainder == 0)
            return result;
        result += '.';
        // Remainder -> position of the fraction digit it produced; the first
        // remainder seen twice opens the recurring parentheses at its position.
        unordered_map<long long, int> seen;
        string fraction;
        while (remainder != 0) {
            auto found = seen.find(remainder);
            if (found != seen.end()) {
                // Everything from that position recurs: close the cycle there.
                fraction.insert(found->second, "(");
                fraction += ')';
                break;
            }
            seen[remainder] = fraction.size();
            remainder *= 10;
            fraction += (char)('0' + remainder / d);
            remainder %= d;
        }
        return result + fraction;
    }
};
