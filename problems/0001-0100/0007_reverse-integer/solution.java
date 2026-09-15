class Solution {

    public int reverse(int x) {
        int rev = 0;
        while (x != 0) {
            // Java division truncates toward zero, so the popped digit
            // carries the sign: -123 pops -3, -2, -1 and builds -321.
            int pop = x % 10;
            x /= 10;
            // Clamp before the push, never after: the statement forbids
            // 64-bit slack, so rev * 10 + pop must provably stay in range.
            // The edge digits are 7 (2147483647) and -8 (-2147483648).
            if (rev > Integer.MAX_VALUE / 10) return 0;
            if (rev == Integer.MAX_VALUE / 10 && pop > 7) return 0;
            if (rev < Integer.MIN_VALUE / 10) return 0;
            if (rev == Integer.MIN_VALUE / 10 && pop < -8) return 0;
            rev = rev * 10 + pop;
        }
        return rev;
    }
}
