class Solution {
  public:
    string fractionAddition(string expression) {
        // One left-to-right scan reads each fraction: an optional sign, the
        // numerator's digits, '/', the denominator's digits. Fold it into the
        // running num/den by cross-multiplication - num/den +/- v/w =
        // (num*w +/- v*den)/(den*w) - integers only, never floats.
        long long num = 0, den = 1;
        int i = 0, n = expression.size();
        while (i < n) {
            long long sign = 1;
            char mark = expression[i];
            if (mark == '+' || mark == '-') {
                sign = mark == '-' ? -1 : 1;
                i++;
            }
            long long value = 0;
            while (i < n && expression[i] >= '0' && expression[i] <= '9') {
                value = value * 10 + (expression[i] - '0');
                i++;
            }
            i++; // the '/' between numerator and denominator
            long long divisor = 0;
            while (i < n && expression[i] >= '0' && expression[i] <= '9') {
                divisor = divisor * 10 + (expression[i] - '0');
                i++;
            }
            num = num * divisor + sign * value * den;
            den *= divisor;
        }
        // Reduce once at the end. gcd(0, den) is den, so a zero sum collapses
        // to 0/1 and an integer keeps its denominator 1; the sign stays on
        // the numerator because den, a product of positives, is positive.
        long long a = num < 0 ? -num : num, b = den;
        while (b != 0) {
            long long rest = a % b;
            a = b;
            b = rest;
        }
        return to_string(num / a) + "/" + to_string(den / a);
    }
};
