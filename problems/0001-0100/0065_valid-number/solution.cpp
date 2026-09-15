class Solution {
  public:
    bool isNumber(string s) {
        // One left-to-right scan over the grammar's skeleton: sign, mantissa
        // (integer or decimal), optional exponent. seenDigit is scoped to the
        // part being read — the mantissa first, then the exponent after the
        // 'e'/'E' resets it.
        bool seenDigit = false, seenDot = false, seenExp = false;
        for (int i = 0; i < (int)s.size(); i++) {
            char c = s[i];
            if (c >= '0' && c <= '9') {
                seenDigit = true;
            } else if (c == '+' || c == '-') {
                // A sign is legal only at the very start or right after 'e'/'E'.
                if (i > 0 && s[i - 1] != 'e' && s[i - 1] != 'E') {
                    return false;
                }
            } else if (c == '.') {
                // At most one dot, and only in the mantissa: the exponent is an integer.
                if (seenDot || seenExp) {
                    return false;
                }
                seenDot = true;
            } else if (c == 'e' || c == 'E') {
                // At most one exponent, and only after the mantissa has shown a digit.
                if (seenExp || !seenDigit) {
                    return false;
                }
                seenExp = true;
                seenDigit = false;
            } else {
                // Any other character (every letter but e/E) is invalid.
                return false;
            }
        }
        // The last part read must have contained at least one digit.
        return seenDigit;
    }
};
