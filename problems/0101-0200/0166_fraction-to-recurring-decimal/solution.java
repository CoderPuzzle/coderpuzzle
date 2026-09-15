import java.util.HashMap;
import java.util.Map;

class Solution {

    public String fractionToDecimal(int numerator, int denominator) {
        // -2^31 has no positive int counterpart, so widen before magnitudes;
        // every later intermediate is a remainder below 2^31 times 10.
        long n = numerator < 0 ? -((long) numerator) : numerator;
        long d = denominator < 0 ? -((long) denominator) : denominator;
        // Magnitudes in, sign out: "-" is prepended once, and never on a zero
        // result (0 over a negative denominator must not become "-0").
        StringBuilder result = new StringBuilder();
        if (numerator < 0 != denominator < 0 && n != 0) result.append('-');
        result.append(n / d);
        long remainder = n % d;
        if (remainder == 0) return result.toString();
        result.append('.');
        // Remainder -> position of the fraction digit it produced; the first
        // remainder seen twice opens the recurring parentheses at its position.
        Map<Long, Integer> seen = new HashMap<>();
        StringBuilder fraction = new StringBuilder();
        while (remainder != 0) {
            Integer start = seen.get(remainder);
            if (start != null) {
                // Everything from that position recurs: close the cycle there.
                fraction.insert(start.intValue(), '(');
                fraction.append(')');
                break;
            }
            seen.put(remainder, fraction.length());
            remainder *= 10;
            fraction.append(remainder / d);
            remainder %= d;
        }
        return result.append(fraction).toString();
    }
}
