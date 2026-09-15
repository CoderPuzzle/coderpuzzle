class Solution {

    public int[] plusOne(int[] digits) {
        // Adding one only disturbs the suffix of trailing 9s: scan from the
        // least significant digit, rolling 9s over to 0 and passing the carry
        // left, until a digit small enough to absorb it stops the cascade.
        for (int i = digits.length - 1; i >= 0; --i) {
            if (digits[i] < 9) {
                ++digits[i];
                return digits;
            }
            digits[i] = 0;
        }
        // The loop ran off the front, so every digit was a 9 and the number
        // grew by one place: 999 becomes 1000, a fresh n+1 digits led by 1.
        // A new int[] is already zero-filled everywhere past the leading 1.
        int[] grown = new int[digits.length + 1];
        grown[0] = 1;
        return grown;
    }
}
