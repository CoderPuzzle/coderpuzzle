class Solution {

    public int myAtoi(String s) {
        // One left-to-right scan over s implements the statement's four steps
        // in order: whitespace, signedness, conversion, rounding.
        int i = 0,
            n = s.length();
        while (i < n && s.charAt(i) == ' ') {
            i++;
        }
        int sign = 1;
        if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
            if (s.charAt(i) == '-') {
                sign = -1;
            }
            i++;
        }
        // 64-bit accumulator: the early clamp below keeps it within 2^31 - 1,
        // so even a 200-digit run can never overflow it.
        long total = 0;
        while (i < n && s.charAt(i) >= '0' && s.charAt(i) <= '9') {
            int digit = s.charAt(i) - '0';
            // Clamp on the fly: if appending this digit would pass 2^31 - 1,
            // the value is out of range and the answer is the boundary in the
            // sign's direction.
            if (total > (2147483647L - digit) / 10) {
                return sign == 1 ? 2147483647 : -2147483648;
            }
            total = total * 10 + digit;
            i++;
        }
        return (int) (sign * total);
    }
}
