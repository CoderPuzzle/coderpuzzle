class Solution {

    public String multiply(String num1, String num2) {
        // The product of an m-digit and an n-digit number has at most m + n
        // digits, so accumulate raw digit-pair products into exactly that many
        // cells before carrying anything.
        int m = num1.length(),
            n = num2.length();
        int[] digits = new int[m + n];
        for (int i = m - 1; i >= 0; i--) {
            int d1 = num1.charAt(i) - '0';
            for (int j = n - 1; j >= 0; j--) {
                // Digit i of num1 times digit j of num2 lands at i + j + 1
                // (most-significant-first indexing), so every pair can add
                // into its cell directly; no carrying yet.
                digits[i + j + 1] += d1 * (num2.charAt(j) - '0');
            }
        }
        // One right-to-left pass normalizes each cell to a single digit and
        // pushes the overflow one cell left, exactly like schoolbook carrying.
        int carry = 0;
        for (int k = digits.length - 1; k >= 0; k--) {
            int total = digits[k] + carry;
            digits[k] = total % 10;
            carry = total / 10;
        }
        // Neither input has a leading zero, so the product has m + n or
        // m + n - 1 digits; strip the unused leading cell, keeping at least
        // one digit so "0" operands yield "0" with no special case.
        int start = 0;
        while (start < digits.length - 1 && digits[start] == 0) {
            start++;
        }
        StringBuilder result = new StringBuilder();
        for (int k = start; k < digits.length; k++) {
            result.append((char) ('0' + digits[k]));
        }
        return result.toString();
    }
}
