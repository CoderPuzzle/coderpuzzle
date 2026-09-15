class Solution {

    public int superpalindromesInRange(String left, String right) {
        // The square root of a super-palindrome is itself a palindrome, so
        // the candidates come from the roots, never from the values: build
        // every palindromic root of up to nine digits by mirroring a half,
        // square it, and keep the squares that are palindromes inside the
        // range. Nine digits of root suffice because right is below 10^18
        // and the root of anything below 10^18 is below 10^9.
        long low = Long.parseLong(left);
        long high = Long.parseLong(right);
        int count = 0;
        for (int length = 1; length <= 9; length++) {
            int halfLength = (length + 1) / 2;
            for (long half = pow10(halfLength - 1); half < pow10(halfLength); half++) {
                String digits = Long.toString(half);
                String mirrored = new StringBuilder(digits.substring(0, length - halfLength)).reverse().toString();
                long root = Long.parseLong(digits + mirrored);
                // Every square fits a long: roots stay below 10^9, so the
                // widest product is 999,999,999^2 < 10^18, an order of
                // magnitude inside long's 9.22 * 10^18 ceiling.
                long square = root * root;
                // Roots ascend across widths and halves alike, so squares
                // do too: the first square above `high` ends the scan.
                if (square > high) {
                    return count;
                }
                if (square >= low && isPalindrome(square)) {
                    count++;
                }
            }
        }
        return count;
    }

    private static long pow10(int exponent) {
        long value = 1;
        for (int i = 0; i < exponent; i++) {
            value *= 10;
        }
        return value;
    }

    private static boolean isPalindrome(long value) {
        String digits = Long.toString(value);
        int i = 0;
        int j = digits.length() - 1;
        while (i < j) {
            if (digits.charAt(i) != digits.charAt(j)) {
                return false;
            }
            i++;
            j--;
        }
        return true;
    }
}
