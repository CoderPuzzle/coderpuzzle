import java.util.Arrays;

class Solution {

    public int splitNum(int num) {
        // Greedy over sorted digits: ascending order, dealt alternately
        // to num1 and num2, puts the small digits where they carry the
        // most significance and interleaves so neither number grows a
        // fat leading digit; the exchange argument shows any other deal
        // has both parts at least as large. Sums stay under 2*10^5 (at
        // most 5 significant digits per part), well inside an int.
        char[] digits = Integer.toString(num).toCharArray();
        Arrays.sort(digits);
        int num1 = 0;
        int num2 = 0;
        for (int i = 0; i < digits.length; ++i) {
            if (i % 2 == 0) {
                num1 = num1 * 10 + (digits[i] - '0');
            } else {
                num2 = num2 * 10 + (digits[i] - '0');
            }
        }
        return num1 + num2;
    }
}
