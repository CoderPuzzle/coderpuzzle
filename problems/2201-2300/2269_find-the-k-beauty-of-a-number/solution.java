class Solution {

    public int divisorSubstrings(int num, int k) {
        // Slide a length-k window over the digit string, keeping the window's
        // integer value incrementally: drop the leading digit, shift, add the
        // new trailing digit. A zero window never divides num.
        String digits = Integer.toString(num);
        int power = 1;
        for (int i = 0; i < k - 1; ++i) {
            power *= 10;
        }
        int window = Integer.parseInt(digits.substring(0, k));
        int count = 0;
        if (window != 0 && num % window == 0) {
            ++count;
        }
        for (int i = k; i < digits.length(); ++i) {
            window = (window % power) * 10 + (digits.charAt(i) - '0');
            if (window != 0 && num % window == 0) {
                ++count;
            }
        }
        return count;
    }
}
