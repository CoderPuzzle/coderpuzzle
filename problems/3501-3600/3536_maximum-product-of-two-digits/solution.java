import java.util.Arrays;

class Solution {

    public int maxProduct(int n) {
        // All digits are >= 0, so the best pair product is the product of
        // the two largest digits; sorting the (at most 10) digits and
        // taking the top two answers every case, repeated digits included.
        char[] chars = Integer.toString(n).toCharArray();
        int[] digits = new int[chars.length];
        for (int i = 0; i < chars.length; ++i) {
            digits[i] = chars[i] - '0';
        }
        Arrays.sort(digits);
        return digits[digits.length - 1] * digits[digits.length - 2];
    }
}
